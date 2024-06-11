import { Component, Inject } from "@angular/core";
import {
    MatDialog,
    MatDialogRef,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MAT_DIALOG_DATA,
  } from '@angular/material/dialog';
import { HotToastService } from "@ngneat/hot-toast";
import { AppGlobals } from "../../../app.global";
import { AuthService } from "../../../security/auth/auth.service";
import { UsersService } from "../../users/users.service";
import { PayrollService } from "../../payroll/payroll.service";
import { PayrollProgressBarService } from "../../payroll/payroll-progress-bar/payroll-progress-bar.service";
import { FilterByService } from "./filter-by.service";
import moment from "moment";

@Component({
    selector: 'app-save-changes',
    styleUrl: './filter-by.component.css',
    template: `<h2 mat-dialog-title>Select date range</h2>
    <mat-dialog-content>
      <form class="form-controls">
      <mat-form-field style="margin-right: 10px;" appearance="outline">
                <mat-label>From</mat-label>
                <input   matInput [matDatepicker]="picker1" [(ngModel)]="fromDate" name="fromDate">
                <!-- <mat-hint>MM/DD/YYYY</mat-hint> -->
                <mat-datepicker-toggle matIconSuffix [for]="picker1"></mat-datepicker-toggle>
                <mat-datepicker #picker1></mat-datepicker>
              </mat-form-field>
            <mat-form-field style="margin-right: 10px;" appearance="outline">
                <mat-label>To</mat-label>
                <input   matInput [matDatepicker]="picker2" [(ngModel)]="toDate" name="toDate">
                <!-- <mat-hint>MM/DD/YYYY</mat-hint> -->
                <mat-datepicker-toggle matIconSuffix [for]="picker2"></mat-datepicker-toggle>
                <mat-datepicker #picker2></mat-datepicker>
              </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions class="sc-actions">
      <button mat-raised-button color="warn" type="button" (click)="onClear()" >Clear filter</button>
      <div>
      <button mat-button type="button" (click)="onClose()" >Close</button>
      <button mat-button type="button" (click)="onSubmit()" >Submit</button>
      </div>
    </mat-dialog-actions>`
})
export class FilterByComponent {
  objToSend: any = {
     month: 2,
     year: 2024
   }

   fromDate: Date = new Date()
   toDate: Date = new Date()
  dataIsLoaded: boolean = false
  roleLS: number = Number(localStorage.getItem(this._globals.baseAppName + '_role'))
    constructor(
      private _auth: AuthService,
      @Inject(MAT_DIALOG_DATA) public data: {
        parentScreen: string
      },
      private _globals: AppGlobals,
      private service: FilterByService,
      private payrollService: PayrollProgressBarService,
      public dialogRef: MatDialogRef<FilterByComponent>,
      private toast: HotToastService,
      ) {

    }

    ngOnInit() {
      
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

    // onSubmit () {
    //     const fromDate = moment( this.fromDate, 'MM-DD-YYYY HH:mm:ss',true).format("YYYY-MM-DD HH:mm:ss");
    //     const toDate = moment( this.toDate, 'MM-DD-YYYY HH:mm:ss',true).format("YYYY-MM-DD HH:mm:ss");
    // //   console.log(fromDate);
    //     const dateFilter = "checkin between '" + fromDate + "' and '" + toDate + "'"
      
    //       this.dialogRef.close(dateFilter)
          
       
    // }
    onSubmit() {
        if (this.toDate < this.fromDate) {
          // Show an error message or perform any action for invalid input
          this.toast.error('Invalid date range. "To date" cannot be less than "From date".');
          return;
        }
      
        const fromDate = moment(this.fromDate, 'MM-DD-YYYY HH:mm:ss', true).format("YYYY-MM-DD HH:mm:ss");
        const toDate = moment(this.toDate, 'MM-DD-YYYY HH:mm:ss', true).endOf('day').format("YYYY-MM-DD HH:mm:ss");
        const dateFilter = "between '" + fromDate + "' and '" + toDate + "'";
        this.dialogRef.close(dateFilter);
      }

      onClose() {
        this.dialogRef.close("false")
      }

      onClear() {
        this.dialogRef.close('');
      }
}