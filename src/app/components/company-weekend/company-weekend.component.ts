import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { SaveChangesComponent } from '../general-operations/tenure-options/save-changes.component';
import { CompanyWeekendService } from './company-weekend.service';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AppGlobals } from '../../app.global';
import { GlobalService } from '../../global.service';
import { NgForm } from '@angular/forms';
import { CompanyWeekendModel, WeekendModel } from './company-weekend.model';
import { AuthService } from '../../security/auth/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-company-weekend',
  templateUrl: './company-weekend.component.html',
  styleUrl: './company-weekend.component.css'
})
export class CompanyWeekendComponent {

  // local variables 
  days: WeekendModel[] = [
    {day: false},
    {day: false},
    {day: false},
    {day: false},
    {day: false},
    {day: false},
    {day: false}
  ]

  holidayId: number = 0
 

  submitDisable: boolean = false;

  @ViewChild('heroForm') ngForm!: NgForm;

  constructor(
    private holidayServcie: CompanyWeekendService,
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
   
    this.refreshMe()
   
  }

  refreshMe() {
  
    this.submitDisable = false
          this.holidayServcie.getRecordEntry(1).pipe(
            this.toast.observe({
              loading: 'Just a moment while getting the data...',
              success: (data) => 'Data loaded successfully ...!',
              error: (error) => `API Error: ${error.message}`,
            })
          ).subscribe({
            next: (response) => {
              this.toast.close()
              // var res = JSON.parse(response)
              console.log('API Response:', response);
              this.days[0].day = response.satDay
              this.days[1].day = response.sunDay
              this.days[2].day = response.monDay
              this.days[3].day = response.tueDay
              this.days[4].day = response.wedDay
              this.days[5].day = response.thuDay
              this.days[6].day = response.friDay

              this.submitDisable = false
      
            },
            error: (err) => {
              this.submitDisable = false
              console.error('API Error:', err);
            },
          });
        
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
  this.submitDisable = true
  // this.router.navigate(['/user']);
  // console.log(this.firstName);
  var dataToSend: CompanyWeekendModel = {
    "compWeekendId": 1,
    "satDay": this.days[0].day,
    "sunDay": this.days[1].day,
    "monDay": this.days[2].day,
    "tueDay": this.days[3].day,
    "wedDay": this.days[4].day,
    "thuDay": this.days[5].day,
    "friDay": this.days[6].day,
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
    "TransId": 0
    }; // Example data to send

  console.log(dataToSend);
  
  this.holidayServcie.sendData(dataToSend).pipe(
    this.toast.observe({
      loading: 'Saving new record...',
      success: (data) => `${data.errorMessage}`,
      error: (error) => `API Error: ${error.message}`,
    })
  ).subscribe(
    response => {
      console.log('API Response:', response);
      // this.router.navigate(['/system/publicholiday'], { relativeTo: this.activeRoute.parent });
      this.refreshMe()
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
toggleDay(id: number) {
  for (let i = 0; i < this.days.length; i++) {
    if (id == i) {
      this.days[i].day = true
    }else {
      this.days[i].day = false
    }
  }
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
        // this.router.navigate(['/system/publicholiday'], { relativeTo: this.activeRoute.parent });
        this.refreshMe()
      }
     })
  }
  }else {
    // this.router.navigate(['/system/publicholiday'], { relativeTo: this.activeRoute.parent });
    // this.refreshMe()
  }
 
}

}



