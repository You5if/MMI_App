import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AggToSendModel } from '../agreement.model';
import { AgreementService } from '../agreement.service';
import { SaveChangesComponent } from '../../loan/tenure-options/save-changes.component';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AppGlobals } from '../../../app.global';
import { GlobalService } from '../../../global.service';
import { CommonService } from '../../common.service';
import { AuthService } from '../../../security/auth/auth.service';

@Component({
  selector: 'app-agreement-entry',
  templateUrl: './agreement-entry.component.html',
  styleUrl: './agreement-entry.component.css'
})
export class AgreementEntryComponent {

  // local variables 
  public empId = 31;
  public agStart = new Date().toString();
  public agEnd = new Date().toString();
  public department = '';
  public jobTitle = '';
  public description = '';
  public remarks = '';
  public earn1 = 0;
  public earn2 = 0;
  public earn3 = 0;
  public earn4 = 0;
  public ded1 = 0;
  public ded2 = 0;
  public ded3 = 0;

  empAgreementId: number = 0
 

  @ViewChild('heroForm') ngForm!: NgForm;

  constructor(
    private AgreementServcie: AgreementService,
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
          this.AgreementServcie.getRecordEntry(Number(param['id'])).subscribe({
            next: (response) => {
              // var res = JSON.parse(response)
              console.log('API Response:', response);
              this.empAgreementId = response.empAgreementId
              this.agStart = response.agStart
              this.agEnd = response.agEnd
              this.department = response.department
              this.jobTitle = response.jobTitle
              this.description = response.description
              this.remarks = response.remarks
              this.earn1 = response.earn1
              this.earn2 = response.earn2
              this.earn3 = response.earn3
              this.earn4 = response.earn4
              this.ded1 = response.ded1
              this.ded2 = response.ded2
              this.ded3 = response.ded3

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
  var dataToSend: AggToSendModel = {
    "EmpAgreementId": this.empAgreementId,
    "EmpId": this.empId,
    "AgStart": this.agStart,
    "AgEnd": this.agEnd,
    "Department": this.department,
    "JobTitle": this.jobTitle,
    "Description": this.description,
    "Remarks": this.remarks,
    "Earn1": this.earn1,
    "Earn2": this.earn2,
    "Earn3": this.earn3,
    "Ded1": this.ded1,
    "Ded2": this.ded2,
    "Ded3": this.ded3,
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
  
  this.AgreementServcie.sendData(dataToSend).subscribe(
    response => {
      console.log('API Response:', response);
      this.router.navigate(['/system/agreement'], { relativeTo: this.activeRoute.parent });
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
        this.router.navigate(['/system/agreement'], { relativeTo: this.activeRoute.parent });
      }
     })
  }
  }else {
    this.router.navigate(['/system/agreement'], { relativeTo: this.activeRoute.parent });
  }
 
}

}



