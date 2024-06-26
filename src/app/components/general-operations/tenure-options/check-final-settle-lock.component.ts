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
import { FinalSettlementService } from "../../final-settlement/final-settlement.service";
import { HotToastService } from "@ngneat/hot-toast";
import { AppGlobals } from "../../../app.global";
import { AuthService } from "../../../security/auth/auth.service";

@Component({
    selector: 'app-save-changes',
    template: `<h2 mat-dialog-title>Lock this record</h2>
    <mat-dialog-content>
    <mat-dialog-content>
      <form style="margin-top: 10px;">
            <mat-form-field style="margin-right: 10px; width: 100%;" appearance="outline">
                <mat-label>Description</mat-label>
                <textarea   matInput appTitleCase placeholder="Description"  [(ngModel)]="data.Description" name="description"  ></textarea>
            </mat-form-field>
    
           
        
            <mat-form-field style="margin-right: 10px;width: 100%;" appearance="outline">
                <mat-label>Remarks</mat-label>
                <textarea  matInput appTitleCase placeholder="Remarks"  [(ngModel)]="data.Remarks" name="remarks"  ></textarea>
            </mat-form-field>
          
        
      
      </form>
    </mat-dialog-content>
    <mat-dialog-actions style="display: flex; flex-direction: row;  justify-content: flex-end;">
      <button mat-button type="button" [mat-dialog-close]="false" >Close</button>
      <button mat-button type="button" (click)="onSubmit()" >Submit</button>
    </mat-dialog-actions>`
})
export class CheckFinalSettleLockComponent {
  newPassword: string;
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: {FinalSettleId: number, Description: string, Remarks: string},
      public dialogRef: MatDialogRef<CheckFinalSettleLockComponent>,
      private toast: HotToastService,
      private _auth: AuthService,
      private usersService: FinalSettlementService) {}

    onSubmit() {
      const dataToAPI = { 
        "FinalSettLockId": 0,
         "FinalSettleId": this.data.FinalSettleId,
         "IsLocked": true,
         "Remarks": this.data.Remarks,
         "Description": this.data.Description,
         "IsTest": false,
         "Active": true,
         "UserCR": Number(this._auth.getUserId()),   
        "Company": 2,
        "RoleCR": Number(this._auth.getRole()),  
         "Browser": "Chrome",
         "Device": "Laptop",
         "Resol": "1920x1080",
         "TransId": 0 }
      this.usersService.lockRecord(dataToAPI).subscribe(
        response => {
          // console.log('API Response:', response);
          this.toast.success("Record has been Locked")
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