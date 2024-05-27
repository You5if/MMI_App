import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CostCenterGroupService } from '../cost-center-group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CostCenterGroupModel, CostCenterGroupToSendModel } from '../cost-center-group.model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { AppGlobals } from '../../../app.global';
import { GlobalService } from '../../../global.service';
import { AuthService } from '../../../security/auth/auth.service';
import { BankModel } from '../../bank/bank.model';
import { CommonService } from '../../common.service';
import { SaveChangesComponent } from '../../general-operations/tenure-options/save-changes.component';

@Component({
  selector: 'app-cost-center-group-entry',
  templateUrl: './cost-center-group-entry.component.html',
  styleUrl: './cost-center-group-entry.component.css'
})
export class CostCenterGroupEntryComponent {

  // local variables 
  

  invId: number = 0
  description: string = ''
  accounts: any[] = []
 

  submitDisable: boolean = false;

  @ViewChild('heroForm') ngForm!: NgForm;
  
  bankId: number = 0;
  branch: string = '';
  address: string = '';
  contactPer: string = '';
  email: string = '';
  phone1: number;
  phone2: number;
  accNo: string = '';
  accountId: number = 101;
  bankName: string = '';
  costCenGrId: number = 0;
  groupName: string = '';

  constructor(
    private allowanceServcie: CostCenterGroupService,
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
    this.allowanceServcie.getDropdown().subscribe({
      next: (value) => {
        this.accounts = value
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
          this.allowanceServcie.getRecordEntry(Number(param['id'])).subscribe({
            next: (response: CostCenterGroupModel) => {
              this.toast.close()
              // var res = JSON.parse(response)
              console.log('API Response:', response);
              this.costCenGrId = response.costCenGrId
              this.groupName = response.groupName
              this.description = response.description
              
              
              // this.description = response.description
              // this.payEvalFormula = response.payEvalFormula
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
  var dataToSend: CostCenterGroupToSendModel = {
    "CostCenGrId": this.costCenGrId,
        "GroupName": this.groupName,
        "Description": this.description,
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
  
  this.allowanceServcie.sendData(dataToSend).pipe(
    this.toast.observe({
      loading: 'Saving new record...',
      success: (data) => `${data.errorMessage}`,
      error: (error) => `API Error: ${error.message}`,
    })
  ).subscribe(
    response => {
      console.log('API Response:', response);
      this.router.navigate(['/system/cost-center-group'], { relativeTo: this.activeRoute.parent });
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
        this.router.navigate(['/system/cost-center-group'], { relativeTo: this.activeRoute.parent });
      }
     })
  }
  }else {
    this.router.navigate(['/system/cost-center-group'], { relativeTo: this.activeRoute.parent });
  }
 
}

}






