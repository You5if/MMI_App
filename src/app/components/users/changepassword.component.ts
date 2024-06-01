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
    template: `<h2 mat-dialog-title>Change password</h2>
    <mat-dialog-content>
  <mat-form-field appearance="outline">
    <mat-label>New password</mat-label>
    <input matInput [(ngModel)]="data.password" name="newPassword">
  </mat-form-field>
</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="changePassword()" >Save</button>
      <button mat-button [mat-dialog-close]="false" >cancel</button>
    </mat-dialog-actions>`
})
export class ChangePasswordComponent {
  newPassword: string;
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: {appUserId: number, password: string},
      public dialogRef: MatDialogRef<ChangePasswordComponent>,
      private usersService: UsersService) {}

    changePassword() {
      this.usersService.changePassword(this.data).subscribe(
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