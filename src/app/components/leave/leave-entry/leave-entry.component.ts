import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveModel, LeaveToSendModel } from '../leave.model';
import { LeaveService } from '../leave.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppGlobals } from '../../../app.global';
import { GlobalService } from '../../../global.service';
import { CommonService } from '../../common.service';
import { SaveChangesComponent } from '../../general-operations/tenure-options/save-changes.component';
import { AuthService } from '../../../security/auth/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-leave-entry',
  templateUrl: './leave-entry.component.html',
  styleUrl: './leave-entry.component.css'
})
export class LeaveEntryComponent  {

  // local variables 
  

  invId: number = 0
  description: string = ''
  leaves: any[] = []
 

  submitDisable: boolean = false;

  @ViewChild('heroForm') ngForm!: NgForm;
  leaveFormula: string = '';
  isPaid: boolean = false;
  leaveName: string = '';
  payEvalFormula: string = '';
  leaveId: number = 0;

  constructor(
    private leaveServcie: LeaveService,
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
    this.leaveServcie.getDropdown().subscribe({
      next: (value) => {
        this.leaves = value
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
          this.leaveServcie.getRecordEntry(Number(param['id'])).subscribe({
            next: (response: LeaveModel) => {
              this.toast.close()
              // var res = JSON.parse(response)
              console.log('API Response:', response);
              this.leaveId = response.leaveId
              this.leaveFormula = response.leaveFormula
              this.isPaid = response.isPaid
              this.leaveName = response.leaveName
              this.description = response.description
              this.payEvalFormula = response.payEvalFormula
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
  var dataToSend: LeaveToSendModel = {
    "LeaveId": this.leaveId,
  "LeaveName": this.leaveName,
  "Description": this.description,
  "LeaveFormula": this.leaveFormula,
  "IsPaid": this.isPaid,
  "PayEvalFormula": this.payEvalFormula,
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
  }
  ; // Example data to send

  console.log(dataToSend);
  
  this.leaveServcie.sendData(dataToSend).pipe(
    this.toast.observe({
      loading: 'Saving new record...',
      success: (data) => `${data.errorMessage}`,
      error: (error) => `API Error: ${error.message}`,
    })
  ).subscribe(
    response => {
      console.log('API Response:', response);
      this.router.navigate(['/system/leave'], { relativeTo: this.activeRoute.parent });
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
        this.router.navigate(['/system/leave'], { relativeTo: this.activeRoute.parent });
      }
     })
  }
  }else {
    this.router.navigate(['/system/leave'], { relativeTo: this.activeRoute.parent });
  }
 
}

}




