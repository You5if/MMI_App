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
import { SaveChangesComponent } from '../../loan/tenure-options/save-changes.component';
import { AuthService } from '../../../security/auth/auth.service';

@Component({
  selector: 'app-emp-inventory-entry',
  templateUrl: './emp-inventory-entry.component.html',
  styleUrl: './emp-inventory-entry.component.css'
})
export class EmpInventoryEntryComponent  {

  // local variables 
  public empId = 31;

  empInvId: number = 0
 

  @ViewChild('heroForm') ngForm!: NgForm;


  empInvListId: number = 2;
  modelNo: string;
  specs: string;
  expiry: string;
  allocationDate: string;
  witnessEmp1: number = 2;
  witnessEmp2: number = 2;
  allocRemarks: string;
  withdrawDate: string;
  witnessWDEmp1: number = 2;
  witnessWDEmp2: number = 2;
  withdrRemarks: string;
  costOfItem: number = 0;

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
    private _auth: AuthService,
    ) {

  }

  ngOnInit():void {
    this.activeRoute.params.subscribe(
      param => {
        if (param['id'] != '0') {
          this.empInvServcie.getRecordEntry(Number(param['id'])).subscribe({
            next: (response: EmpInvModel) => {
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

            },
            error(err) {
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

  EnterSubmit(event: any) { 
    //keycode for Enter is 13 
    if (event.keyCode === 13) {
confirm('Enter key is pressed, form will be submitted'); 
//calling submit method if key pressed is Enter.
 } if (event.keyCode === 27) {
  this.btnClickCancel()
 }
 console.log(event.keyCode);
//function to submit the form submitit(form){
  
}

btnClick=  () => {
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
  "UserCR": 456,
  "Company": 789,
  "RoleCR": 123,
  "DateCR": "2024-02-28T09:10:00",
  "Browser": "Firefox",
  "Device": "Laptop",
  "Resol": "1366x768",
  "TransId": 0
    }; // Example data to send

  console.log(dataToSend);
  
  this.empInvServcie.sendData(dataToSend).subscribe(
    response => {
      console.log('API Response:', response);
      this.router.navigate(['/system/empinventory'], { relativeTo: this.activeRoute.parent });
      // this.screenMode = 'index';
      // Handle the response data here
    },
    error => {
      console.error('API Error:', error);
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




