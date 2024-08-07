import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { EmpInventoryService } from '../emp-inventory.service';
import { EmpInvModel, EmpInvToSend } from '../emp-inventory.model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AppGlobals } from '../../../app.global';
import { GlobalService } from '../../../global.service';
import { CommonService } from '../../common.service';
import { SaveChangesComponent } from '../../general-operations/tenure-options/save-changes.component';
import { AuthService } from '../../../security/auth/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-emp-inventory-entry',
  templateUrl: './emp-inventory-entry.component.html',
  styleUrl: './emp-inventory-entry.component.css'
})
export class EmpInventoryEntryComponent  {

  // local variables 
  public empId :number;

  empInvId: number = 0
 

  submitDisable: boolean = false;

  @ViewChild('heroForm') ngForm!: NgForm;


  empInvListId: number;
  modelNo: string = '';
  specs: string = '';
  expiry: Date;
  allocationDate:Date;
  witnessEmp1: number;
  witnessEmp2: number ;
  allocRemarks: string = '';
  withdrawDate:Date;
  witnessWDEmp1: number ;
  witnessWDEmp2: number ;
  withdrRemarks: string = '';
  costOfItem: number = 0;
  employees: any[] = []
  invItems: any[] = []


  constructor(
    private empInvServcie: EmpInventoryService,
    private http: HttpClient,
    private _cf: CommonService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cdref: ChangeDetectorRef,
    private dialog: MatDialog,
    private _globals: AppGlobals,
    private globalService: GlobalService,
    private toast: HotToastService,
    private _auth: AuthService,
    ) {

  }

  ngOnInit():void {
    this.empInvServcie.getDropdown().subscribe({
      next: (value) => {
        this.employees = value
      },
      error: (err) => {
        console.error('API Error:', err);
      },
    })
    this.empInvServcie.getDropdownItem().subscribe({
      next: (value) => {
        this.invItems = value
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
          this.empInvServcie.getRecordEntry(Number(param['id'])).subscribe({
            next: (response: EmpInvModel) => {
              this.toast.close()
              // var res = JSON.parse(response)
              console.log('API Response:', response);
              this.empInvId = response.empInvId
              this.empId = response.empId
              this.empInvListId = response.empInvListId
              this.modelNo = response.modelNo
              this.specs = response.specs
              this.expiry = response.expiry
              this.allocationDate = response.allocationDate
              this.witnessEmp1 = response.witnessEmp1
              this.witnessEmp2 = response.witnessEmp2
              this.allocRemarks = response.allocRemarks
              this.withdrawDate = response.withdrawDate
              this.witnessWDEmp1 = response.witnessWDEmp1
              this.witnessWDEmp2 = response.witnessWDEmp2
              this.withdrRemarks = response.withdrRemarks
              this.costOfItem = response.costOfItem

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
      const firstMatInputElement = document.getElementById('firstControl');
      
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
        const firstMatInputElement = document.getElementById('firstControl');
      
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

  //  this.cdref.detectChanges()

    

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

  if (!this.expiry) {
    this.toast.error("Choose expiry date")
    return;
  }
  if (!this.allocationDate) {
    this.toast.error("Choose allocation date")
    return;
  }
  if (!this.withdrawDate) {
    this.toast.error("Choose withdraw date")
    return;
  }
  if (this.expiry < this.allocationDate) {
    this.toast.error("Expiry can't be less than Allocation date")
    return;
  }
  if (this.allocationDate < this.withdrawDate) {
    this.toast.error("Allocation date can't be less than Withdraw date")
    return;
  }
  // if (this.witnessEmp1 === this.empId) {
  //   this.toast.error("Selected employee can't be chosen in the withness again")
  //   return;
  // }
  // if (this.witnessEmp2 === this.empId) {
  //   this.toast.error("Selected employee can't be chosen in the withness again")
  //   return;
  // }
  // if (this.witnessEmp1 === this.witnessEmp2) {
  //   this.toast.error("Witness 1 and 2 can't be the same")
  //   return;
  // }

  if (this.witnessWDEmp1 === this.empId) {
    this.toast.error("Selected employee can't be chosen in the withness again")
    return;
  }
  if (this.witnessWDEmp2 === this.empId) {
    this.toast.error("Selected employee can't be chosen in the withness again")
    return;
  }
  if (this.witnessWDEmp1 === this.witnessWDEmp2) {
    this.toast.error("Witness 1 and 2 can't be the same")
    return;
  }
  this.submitDisable = true
  // this.router.navigate(['/user']);
  // console.log(this.firstName);
  var dataToSend: EmpInvToSend = {
    "EmpInvId": this.empInvId,
      "EmpId": this.empId,
      "EmpInvListId": this.empInvListId,
      "ModelNo": this.modelNo,
      "Specs": this.specs,
      "Expiry": this.expiry,
      "AllocationDate": this.allocationDate,
      "WitnessEmp1": this.witnessEmp1,
      "WitnessEmp2": this.witnessEmp2,
      "AllocRemarks": this.allocRemarks,
      "WithdrawDate": this.withdrawDate,
      "WitnessWDEmp1": this.witnessWDEmp1,
      "WitnessWDEmp2": this.witnessWDEmp2,
      "WithdrRemarks": this.withdrRemarks,
      "CostOfItem": this.costOfItem,
  "IsTest": this._auth.getIsTest(),
  "Active": true,
  "Deleted": false,
  "UserCR": Number(this._auth.getUserId()),
  "Company": 789,
  "RoleCR": Number(this._auth.getRole()),
  "DateCR": "2024-02-28T09:10:00",
  "Browser": "Firefox",
  "Device": "Laptop",
  "Resol": "1366x768",
  "TransId": 0
    }; // Example data to send

  console.log(dataToSend);
  
  this.empInvServcie.sendData(dataToSend).pipe(
    this.toast.observe({
      loading: 'Saving new record...',
      success: (data) => `${data.errorMessage}`,
      error: (error) => `Error: ${error.error.message}`,
    })
  ).subscribe(
    response => {
      console.log('API Response:', response);
      this.router.navigate(['/system/empinventory'], { relativeTo: this.activeRoute.parent });
      // this.screenMode = 'index';
      // Handle the response data here
    },
    error => {
      // console.error('API Error:', error);
      this.submitDisable = false
      // Handle any errors here
    }
  );
}

// btnClickCancel=  () => {
//   // this.router.navigate(['/user']);
//   // this.screenMode = 'index';
//   console.log(this.ngForm.dirty);
//   if (this.ngForm.dirty) {
//     confirm("Save changes?");
//     this.btnClick();
//   }else {
//     this.router.navigate(['../employeeprofile'], { relativeTo: this.activeRoute.parent });
//   }
//   // this.router.navigate(['../employeeprofile'], { relativeTo: this.activeRoute.parent });
 
  
//   // console.log(this.firstName);
// }
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
        this.router.navigate(['/system/empinventory'], { relativeTo: this.activeRoute.parent });
      }
     })
  }
  }else {
    this.router.navigate(['/system/empinventory'], { relativeTo: this.activeRoute.parent });
  }
 
}

}




