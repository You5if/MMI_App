import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoanService } from '../loan.service';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanModel } from '../loan-models/loan.model';
import { LoanChildModel } from '../loan-models/loan-child.model';
import { LoanToSendModel } from '../loan-models/loan-to-send.model';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { CheckTenuresComponent } from '../../general-operations/tenure-options/check-tenures.component';
import { AmountIsLessComponent } from '../../general-operations/tenure-options/AmountIsLess.component copy';
import { SaveChangesComponent } from '../../general-operations/tenure-options/save-changes.component';
import { AuthService } from '../../../security/auth/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-loan-entry',
  templateUrl: './loan-entry.component.html',
  styleUrl: './loan-entry.component.css'
})
export class LoanEntryComponent {

tenure: number = 0;
amount: number = 0;
requestDate = new Date();
tenures: LoanChildModel[] = [];
deletedTenures: LoanChildModel[] = [];
loanTypeId!: number;
loadId: number = 0;
employeeId!: number;
employees: any[] = []
loanTypes: any[] = []


  submitDisable: boolean = false;

  @ViewChild('heroForm') ngForm!: NgForm;

  constructor(
    private loanService: LoanService,
    private http: HttpClient,
    private _cf: CommonService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cdref: ChangeDetectorRef,
    private dialog: MatDialog,private toast: HotToastService,
    private _auth: AuthService,
    ) {

  }

  ngOnInit():void {
    console.log(this.requestDate);
    this.loanService.getDropdown().subscribe({
      next: (value) => {
        this.employees = value
      },
      error: (err) => {
        console.error('API Error:', err);
      },
    })
    this.loanService.getDropdown2().subscribe({
      next: (value) => {
        this.loanTypes = value
      },
      error: (err) => {
        console.error('API Error:', err);
      },
    })
    
    this.activeRoute.params.subscribe(
      param => {
        if (param['id'] != '0') {
          this.submitDisable = true
          this.toast.loading('Wait just a moment ...')
          this.loanService.getRecordEntry(Number(param['id'])).subscribe({
            next: (response) => {
              this.toast.close()
              var res = JSON.parse(response.name)
              console.log('API Response:', res);
              this.amount = res.Amount
              this.requestDate = res.LoanDate
              this.employeeId = res.EmpId
              this.loanTypeId = res.LoanType
              this.loadId = res.LoanReqId
              this.tenures = res.loanTenEntries

              this.submitDisable = false
      
            },
            error: (err) => {
              this.submitDisable = false
              console.error('API Error:', err);
            },
          });
        }
      }
    )
  }

  ngAfterViewInit() {
    // After the view has initialized, focus on the first input field
    // console.log('This is after rendering, LOL!');
    if (typeof document !== 'undefined') {
      const firstMatInputElement = document.getElementById('firstName');
      
      // Manipulating the DOM here

      if (firstMatInputElement instanceof HTMLElement) {
        // Focus on the first mat-input-element
        firstMatInputElement.focus({
          preventScroll: true
        });
      } else {
        // console.log('No element with the class "mat-input-element" found.');
      }
      setTimeout(() => {
        const firstMatInputElement = document.getElementById('firstName');
      
        if (firstMatInputElement instanceof HTMLElement) {
          // Focus on the first mat-input-element
          firstMatInputElement.focus({
            preventScroll: true
          });
        } else {
          // console.log('No element with the class "mat-input-element" found.');
        }
      }, 1500); // Adjust the delay as needed
   }

   this.cdref.detectChanges()

  }

  deleteTenure(loanChild: LoanChildModel) {
    const index = this.tenures.indexOf(loanChild);
    var startDate = new Date(this.requestDate);
    
    if (index >= 0 && index < this.tenures.length) {
      this.tenures[index].Deleted = true;
      this.deletedTenures.push(this.tenures[index]);
      this.tenures.splice(index, 1)
      // Filter out the deleted tenures and calculate the start month and year
      const remainingTenures = this.tenures.filter(tenure => !tenure.Deleted);
      const startMonth = startDate.getMonth() + 1;
      const startYear = startDate.getFullYear();
  
      // Adjust the months and years of the remaining loan tenures
      for (let i = 0; i < remainingTenures.length; i++) {
        const currentLoanChild = remainingTenures[i];
  
        // Calculate the next month and year based on the start month and year
        const nextMonth = startMonth + i + 1;
        const nextYear = startYear + Math.floor((nextMonth - 1) / 12);
  
        // Update the month and year of the current loan tenure
        currentLoanChild.Month = (nextMonth % 12) || 12;
        currentLoanChild.Year = nextYear;
        currentLoanChild.Deleted = false
      }
  
      console.log(this.tenures);
    } else {
      console.log("Invalid loan tenure specified.");
    }
  }

  addNewTenure() {
    const lastMonth = this.tenures[this.tenures.length-1].Month;
        const lastYear = this.tenures[this.tenures.length-1].Year;
        let nextMonth, nextYear;
  
        if (lastMonth === 12) {
          // If the last month was 12, set the next month to 1 and increment the year
          nextMonth = 1;
          nextYear = lastYear + 1;
        } else {
          // Increment the month by 1 and keep the same year
          nextMonth = lastMonth + 1;
          nextYear = lastYear;
        }
  
        const additionalLoanChild: LoanChildModel = {
          "LoanTenId": 0,
          "LoanReqId": this.loadId,
          "Month": nextMonth,
          "Year": nextYear,
          "Amount": 0,
          "Remarks": "Additional payment",
          "Paid": false,
          "Deleted": false
        };

        this.tenures.push(additionalLoanChild)
  
  }

  fetchTenure() {
    if (this.tenures.length != 0) {
      this.tenure = this.tenures.length
    }
      this.tenures = []
    var date = new Date(this.requestDate);
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var remainingLoan = this.amount; // Remaining loan to be distributed
    
    for (let i = 0; i < this.tenure; i++) {
      // Calculate the new month and year
      var newMonth = (month + i + 1) % 12;
      var newYear = year + Math.floor((month + i + 1) / 12);
  
      // Adjust for January (month = 0)
      if (newMonth === 0) {
        newMonth = 12;
        newYear--;
      }
  
      var loanChildAmount;
      if (i === this.tenure - 1) {
        // Last iteration, assign the remaining loan amount
        loanChildAmount = remainingLoan;
      } else {
        // Distribute the loan amount equally among other iterations
        loanChildAmount = this.amount / this.tenure;
      }
  
      const loanChild: LoanChildModel = {
        "LoanTenId": 0,
        "LoanReqId": this.loadId,
        "Month": newMonth,
        "Year": newYear,
        "Amount": Number(loanChildAmount.toFixed(2)),
        "Remarks": "Payment for " + new Date(newYear, newMonth - 1).toLocaleString('default', { month: 'long', year: 'numeric' }),
        "Paid": false,
        "Deleted": false
      }
      
      console.log(loanChild);
      remainingLoan -= Number(loanChildAmount.toFixed(2)); // Subtract the assigned loan amount
      this.tenures.push(loanChild)
    }
    
  }

  EnterSubmit(event: KeyboardEvent) { 
    // event.preventDefault();
    const target = event.target as HTMLElement;
    const tagName = target.tagName.toLowerCase();
    //keycode for Enter is 13 
    console.log(target, tagName);
    if (event.key === "Enter" && tagName !== "input" && tagName !== "mat-select" && tagName !== "mat-checkbox") {
      
        event.preventDefault();
        this.btnClick();
    
// confirm('Enter key is pressed, form will be submitted'); 
//calling submit method if key pressed is Enter.
 } if (event.key === "Escape") {
  this.btnClickCancel()
 }
//  console.log(event.keyCode);
//function to submit the form submitit(form){
  
}


btnClick=  () => {
  var tenureAmount: number = 0
  this.tenures.filter(tenure => !tenure.Deleted).map((item) => {
    tenureAmount += item.Amount
  })
  if (this.amount === tenureAmount) {
     // this.router.navigate(['/user']);
  // console.log(this.firstName);
  this.deletedTenures.map((item): any => {
    this.tenures.push(item)
  })
  var dataToSend: LoanToSendModel = {
    loanReqEntry: {
      "loanReqId": this.loadId,
          "loanDate": this.requestDate,
          "empId": this.employeeId,
          "amount": this.amount,
          "remarks": "Emergency medical expenses",
          "loanType": this.loanTypeId,
          "isTest": this._auth.getIsTest(),
          "active": true,
          "userCR": 456,
          "company": 789,
          "roleCR": 123,
          "browser": "Firefox",
          "device": "Laptop",
          "resol": "1366x768",
          "transId": 0,
          "totalPages": 1,
          "totalRecords": 6
    },
    loanTenEntries: this.tenures
  }; // Example data to send

  console.log(JSON.stringify(dataToSend));
  
  this.loanService.sendData(dataToSend).pipe(
    this.toast.observe({
      loading: 'Saving new record...',
      success: (dataR) => `${dataR.errorMessage}`,
      error: (error) => `API Error: ${error.message}`,
    })
  ).subscribe(
    response => {
      console.log('API Response:', response);
      this.router.navigate(['/system/loan'], { relativeTo: this.activeRoute.parent });
      // this.screenMode = 'index';
      // Handle the response data here
    },
    error => {
      // console.error('API Error:', error);
      this.submitDisable = false
      // Handle any errors here
    }
  );
  }else if (this.amount > tenureAmount) {
    if(this.dialog.openDialogs.length==0){
      const dialogRef = this.dialog.open(CheckTenuresComponent, {
       // disableClose: true  
       
     });

     dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log(result);
      this.adjustLoanDistribution(result);
     })
  }
  }else if (this.amount < tenureAmount) {
    if(this.dialog.openDialogs.length==0){
      const dialogRef = this.dialog.open(AmountIsLessComponent, {
       // disableClose: true  
       
     });

     dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.fetchTenure()
      }
     })
  }
  }
}



adjustLoanDistribution(shouldAddLoanChild: boolean) {
  var loanChildsSum = this.tenures.reduce((sum, loanChild) => sum + loanChild.Amount, 0);
  var diff = this.amount - loanChildsSum;

  if (diff !== 0) {
    if (shouldAddLoanChild) {
      // Add another loanChild with the difference amount
      const lastLoanChild = this.tenures[this.tenures.length - 1];
      const lastMonth = lastLoanChild.Month;
      const lastYear = lastLoanChild.Year;
      let nextMonth, nextYear;

      if (lastMonth === 12) {
        // If the last month was 12, set the next month to 1 and increment the year
        nextMonth = 1;
        nextYear = lastYear + 1;
      } else {
        // Increment the month by 1 and keep the same year
        nextMonth = lastMonth + 1;
        nextYear = lastYear;
      }

      const additionalLoanChild: any = {
        "LoanTenId": 0,
        "LoanReqId": this.loadId,
        "Month": nextMonth,
        "Year": nextYear,
        "Amount": diff,
        "Remarks": "Additional payment",
        "Paid": false,
      };

      this.tenures.push(additionalLoanChild);
      console.log(this.tenures);
    } else {
      // Adjust the amount of the last loanChild to make the sum equal to this.load
      var lastLoanChildIndex = this.tenures.length - 1;
      this.tenures[lastLoanChildIndex].Amount += diff;
    }
  }

  // Recalculate the loanChildsSum after adjustment
  loanChildsSum = this.tenures.reduce((sum, loanChild) => sum + loanChild.Amount, 0);

  console.log("LoanChilds: ", this.tenures);
  console.log("LoanChilds Sum: ", loanChildsSum);
}

btnClickCancel=  () => {
  console.log(this.ngForm.dirty);
  if (this.ngForm.dirty) {
    if(this.dialog.openDialogs.length==0){
      const dialogRef = this.dialog.open(SaveChangesComponent, {
       disableClose: true  
       
     });

     dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.btnClick();
      }else {
        this.router.navigate(['/system/loan'], { relativeTo: this.activeRoute.parent });
      }
     })
  }
  }else {
    this.router.navigate(['/system/loan'], { relativeTo: this.activeRoute.parent });
  }
 
}

}
