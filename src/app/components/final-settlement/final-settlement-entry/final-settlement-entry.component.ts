import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FinalSettlementService } from '../final-settlement.service';
import { FinalSettleToSendModel } from '../final-settlement.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { AppGlobals } from '../../../app.global';
import { GlobalService } from '../../../global.service';
import { AuthService } from '../../../security/auth/auth.service';
import { CommonService } from '../../common.service';
import { SaveChangesComponent } from '../../general-operations/tenure-options/save-changes.component';

@Component({
  selector: 'app-final-settlement-entry',
  templateUrl: './final-settlement-entry.component.html',
  styleUrl: './final-settlement-entry.component.css'
})
export class FinalSettlementEntryComponent {

  // local variables 
  public empId = 31;
  public witness1 = 31;
  public witness2 = 31;
  public finalDate = new Date().toUTCString();

  public description = '';
  public remarks = '';

  gratuityClear: boolean = false
        leaveClear: boolean= false
        salaryClear: boolean= false
        invClear: boolean= false
        handoverCl: boolean= false
        supervisorCl: boolean= false
        managerCl: boolean= false
        handedTo = 31
 

  finalSettleId: number = 0
  leaveId: number = 0
employees: any[] = []
 

  submitDisable: boolean = false;

  @ViewChild('heroForm') ngForm!: NgForm;

  constructor(
    private finalSettleService: FinalSettlementService,
    private http: HttpClient,
    private _cf: CommonService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cdref: ChangeDetectorRef,
    private dialog: MatDialog,private toast: HotToastService,
    private _globals: AppGlobals,
    private globalService: GlobalService,
    private _auth: AuthService,
    ) {

  }

  ngOnInit():void {
    this.finalSettleService.getEmpDropdown().subscribe({
      next: (value) => {
        this.employees = value
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
          this.finalSettleService.getRecordEntry(Number(param['id'])).subscribe({
            next: (response) => {
              this.toast.close()
              // var res = JSON.parse(response)
              console.log('API Response:', response);
              this.finalSettleId = response.finalSettleId
              this.empId = response.empId
              this.finalDate = response.finalDate
              this.remarks = response.remarks
              this.description = response.description
              this.witness1 = response.witness1
              this.gratuityClear = response.gratuityClear
              this.leaveClear = response.leaveClear
              this.salaryClear = response.salaryClear
              this.invClear = response.invClear
              this.handoverCl = response.handoverCl
              this.supervisorCl = response.supervisorCl
              this.managerCl = response.managerCl
              this.handedTo = response.handedTo

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
  this.submitDisable = true
  // this.router.navigate(['/user']);
  // console.log(this.firstName);
  var dataToSend: FinalSettleToSendModel = {
    "FinalSettleId": this.finalSettleId,
  "EmpId": this.empId,
  "FinalDate": this.finalDate,
  "Description": this.description,
  "GratuityClear": this.gratuityClear,
  "LeaveClear": this.leaveClear,
  "SalaryClear": this.salaryClear,
  "InvClear": this.invClear,
  "HandoverCl": this.handoverCl,
  "SupervisorCl": this.supervisorCl,
  "ManagerCl": this.managerCl,
  "HandedTo": this.handedTo,
  "Remarks": this.remarks,
  "Witness1": this.witness1,
  "Witness2": this.witness2,
  "IsTest": this._auth.getIsTest(),
  "Active": true,
  "Deleted": false,
  "UserCR": 456,
  "Company": 789,
  "RoleCR": 123,
  "DateCR": "2024-02-28T09:10:00",
  "Browser": "Firefox",
  "Device": "Laptop",
  "Resol": "1366x768",
  "TransId": 0
  };   // Example data to send

  console.log(dataToSend);
  
  this.finalSettleService.sendData(dataToSend).pipe(
    this.toast.observe({
      loading: 'Saving new record...',
      success: (data) => `${data.errorMessage}`,
      error: (error) => `API Error: ${error.message}`,
    })
  ).subscribe(
    response => {
      console.log('API Response:', response);
      this.router.navigate(['/system/final-settlement'], { relativeTo: this.activeRoute.parent });
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
        this.router.navigate(['/system/final-settlement'], { relativeTo: this.activeRoute.parent });
      }
     })
  }
  }else {
    this.router.navigate(['/system/final-settlement'], { relativeTo: this.activeRoute.parent });
  }
 
}

}




