import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AppGlobals } from '../../../app.global';
import { GlobalService } from '../../../global.service';
import { UsersModel, UsersToSendModel } from '../users.model';
import { SaveChangesComponent } from '../../loan/tenure-options/save-changes.component';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-users-entry',
  templateUrl: './users-entry.component.html',
  styleUrl: './users-entry.component.css'
})
export class UsersEntryComponent {

  // local variables 
  public appUserName = '';
  public displayName = '';
  public password = '';
 

  submitDisable: boolean = false;

  @ViewChild('heroForm') ngForm!: NgForm;

  constructor(
    private usersServcie: UsersService,
    private http: HttpClient,
    private _cf: CommonService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cdref: ChangeDetectorRef,
    private dialog: MatDialog,
    private toast: HotToastService,
    private _globals: AppGlobals,
    private globalService: GlobalService
    ) {

  }

  ngOnInit():void {
   
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
  var dataToSend: UsersToSendModel = { 
    "AppUserName": this.appUserName,
  "DisplayName": this.displayName,
  "Password": this.password,
  "IsTest": false,
  "Active": true,
  "Company": 1,
  "RoleCR": 1,
  "Browser": "Chrome",
  "Device": "Desktop",
  "Resol": "1920x1080",
  "TransId": 0,
  "UserId": 1
  }; // Example data to send

  console.log(dataToSend);
  
  this.usersServcie.sendData(dataToSend).pipe(
    this.toast.observe({
      loading: 'Saving new record...',
      success: (data) => `${data.errorMessage}`,
      error: (error) => `API Error: ${error.message}`,
    })
  ).subscribe(
    response => {
      console.log('API Response:', response);
      this.router.navigate(['/system/users'], { relativeTo: this.activeRoute.parent });
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
        this.router.navigate(['/system/users'], { relativeTo: this.activeRoute.parent });
      }
     })
  }
  }else {
    this.router.navigate(['/system/users'], { relativeTo: this.activeRoute.parent });
  }
 
}

}

