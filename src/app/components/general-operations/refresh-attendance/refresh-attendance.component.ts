import { Component } from "@angular/core";
import {
    MatDialog,
    MatDialogRef,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  } from '@angular/material/dialog';
import { HotToastService } from "@ngneat/hot-toast";
import { AppGlobals } from "../../../app.global";
import { AuthService } from "../../../security/auth/auth.service";
import { UsersService } from "../../users/users.service";
import { RefreshAttanceService } from "./refresh-attendance.service";

@Component({
    selector: 'app-save-changes',
    styleUrl: './refresh-attendance.component.css',
    template: `<h2 mat-dialog-title>Select month and year</h2>
    <mat-dialog-content>
      <form>
      <mat-form-field style="margin-right: 10px;">
                <mat-label>Month</mat-label>
                <mat-select  id="firstControl" [(ngModel)]="objToSend.month" name="month">
                    <mat-option *ngFor="let month of months" [value]="month">{{ month }}</mat-option>
                </mat-select>
            </mat-form-field>
      <mat-form-field style="margin-right: 10px;">
                <mat-label>Year</mat-label>
                <mat-select  [(ngModel)]="objToSend.year" name="year">
                    <mat-option *ngFor="let year of years" [value]="year">{{ year }}</mat-option>
                </mat-select>
            </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button type="button" (click)="onSubmit()" >Submit</button>
      <button mat-button type="button" [mat-dialog-close]="false" >Close</button>
    </mat-dialog-actions>`
})
export class RefreshAttendanceComponent {
  objToSend: any = {
     month: 2,
     year: 2024
   }

   months: number[] = [1,2,3,4,5,6,7,8,9,10,11,12]
   years: number[] = [2024, 2025]
  dataIsLoaded: boolean = false
  roleLS: number = Number(localStorage.getItem(this._globals.baseAppName + '_role'))
    constructor(
      private _auth: AuthService,
      private _globals: AppGlobals,
      private service: RefreshAttanceService,
      public dialogRef: MatDialogRef<RefreshAttendanceComponent>,
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

    onSubmit () {
      this.service.refreshAtt(this.objToSend).pipe(
        this.toast.observe({
          loading: 'Refreshing attendance...',
          success: (dataR) => `${dataR.errorMessage}`,
          error: (error) => `API Error: ${error.message}`,
        })
      ).subscribe((result) => {
        console.log(result);
        this.dialogRef.close(true)
        
      })
    }
}