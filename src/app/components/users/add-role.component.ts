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
import { UsersService } from "./users.service";

@Component({
    selector: 'app-amount-less',
    template: `<h2 mat-dialog-title>Add new role for this user</h2>
    <mat-dialog-content>
      <!-- <p>Add a new role for this user</p> -->
  <mat-form-field>
    <mat-label>Role</mat-label>
    <input matInput type="number" [(ngModel)]="data.appRoleId" name="appRoleId">
  </mat-form-field>
</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="newRole()" >Add role</button>
      <button mat-button [mat-dialog-close]="false" >cancel</button>
    </mat-dialog-actions>`
})
export class AddRoleComponent {
  newPassword: string;
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: {
        appUserRoleId: number
        appUserId: number
        appRoleId: number
        isTest: boolean
        active: boolean
        company: number
        roleCr: number
        browser: string
        device: string
        resol: string
        transId: number
        userId: number
      },
      public dialogRef: MatDialogRef<AddRoleComponent>,
      private usersService: UsersService) {}

    newRole() {
      this.usersService.newRole(this.data).subscribe(
        response => {
          console.log('API Response:', response);
          this.dialogRef.close(true);
          // Handle the response data here
        },
        error => {
          console.error('API Error:', error);
          // Handle any errors here
        }
      );
    }
}