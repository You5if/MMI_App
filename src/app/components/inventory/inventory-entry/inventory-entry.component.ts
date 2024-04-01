import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { InventoryModel, InventoryToSendModel } from '../inventory.model';
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
  selector: 'app-inventory-entry',
  templateUrl: './inventory-entry.component.html',
  styleUrl: './inventory-entry.component.css'
})
export class InventoryEntryComponent {

  // local variables 
  

  invId: number = 0
  itemName: string = ''
  description: string = ''
  itemType: number = 0
 

  @ViewChild('heroForm') ngForm!: NgForm;

  constructor(
    private invServcie: InventoryService,
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
          this.invServcie.getRecordEntry(Number(param['id'])).subscribe({
            next: (response: InventoryModel) => {
              // var res = JSON.parse(response)
              console.log('API Response:', response);
              this.invId = response.empInvListId
              this.itemName = response.itemName
              this.itemType = response.itemType
              this.description = response.description
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
  var dataToSend: InventoryToSendModel = {
    "EmpInvListId": this.invId,
        "ItemName": this.itemName,
        "Description": this.description,
        "ItemType": this.itemType,
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
  }
  ; // Example data to send

  console.log(dataToSend);
  
  this.invServcie.sendData(dataToSend).subscribe(
    response => {
      console.log('API Response:', response);
      this.router.navigate(['/system/inventory'], { relativeTo: this.activeRoute.parent });
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
        this.router.navigate(['/system/inventory'], { relativeTo: this.activeRoute.parent });
      }
     })
  }
  }else {
    this.router.navigate(['/system/inventory'], { relativeTo: this.activeRoute.parent });
  }
 
}

}


