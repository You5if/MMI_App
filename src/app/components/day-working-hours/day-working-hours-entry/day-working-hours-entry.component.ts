import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { SaveChangesComponent } from '../../general-operations/tenure-options/save-changes.component';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AppGlobals } from '../../../app.global';
import { GlobalService } from '../../../global.service';
import { DayWorkingHoursService } from '../day-working-hours.service';
import { DayWorkingHoursModel } from '../day-working-hours.model';
import { AuthService } from '../../../security/auth/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-day-working-hours-entry',
  templateUrl: './day-working-hours-entry.component.html',
  styleUrl: './day-working-hours-entry.component.css'
})
export class DayWorkingHoursEntryComponent {

  // local variables 
  public DayHours = 1;
  public FromDate = new Date();
  public ToDate = new Date();

  MonthWDayId: number = 0
 

  submitDisable: boolean = false;

  @ViewChild('heroForm') ngForm!: NgForm;

  constructor(
    private dwhServcie: DayWorkingHoursService,
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
    this.activeRoute.params.subscribe(
      param => {
        if (param['id'] != '0') {
          this.submitDisable = true
          this.toast.loading('Wait just a moment ...')
          this.dwhServcie.getRecordEntry(Number(param['id'])).subscribe({
            next: (response) => {
              this.toast.close()
              // var res = JSON.parse(response)
              console.log('API Response:', response);
              this.FromDate = response.fromDate
              this.ToDate = response.toDate
              this.DayHours = response.dayHours
              this.MonthWDayId = response.monthWDayId

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
  var dataToSend: DayWorkingHoursModel = {
    "MonthWDayId": this.MonthWDayId,
    "FromDate": this.FromDate,
    "ToDate": this.ToDate,
   "DayHours": this.DayHours,
   "IsTest": this._auth.getIsTest(),
   "Active": true,
   "Deleted": false,
   "UserCR": 456,
   "Company": 789,
   "RoleCR": 123,
   "DateCR": new Date().toString(),
   "Browser": "Firefox",
   "Device": "Laptop",
   "Resol": "1366x768",
   "TransId": 0,
   "totalPages": 1,
      "totalRecords": 3
    }; // Example data to send

  console.log(dataToSend);
  
  this.dwhServcie.sendData(dataToSend).pipe(
    this.toast.observe({
      loading: 'Saving new record...',
      success: (data) => `${data.errorMessage}`,
      error: (error) => `API Error: ${error.message}`,
    })
  ).subscribe(
    response => {
      console.log('API Response:', response);
      this.router.navigate(['/system/dayworkinghours'], { relativeTo: this.activeRoute.parent });
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
        this.router.navigate(['/system/dayworkinghours'], { relativeTo: this.activeRoute.parent });
      }
     })
  }
  }else {
    this.router.navigate(['/system/dayworkinghours'], { relativeTo: this.activeRoute.parent });
  }
 
}

}


