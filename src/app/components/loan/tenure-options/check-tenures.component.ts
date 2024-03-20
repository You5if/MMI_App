import { Component } from "@angular/core";
import {
    MatDialog,
    MatDialogRef,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  } from '@angular/material/dialog';

@Component({
    selector: 'app-check-tenures',
    template: `<h2 mat-dialog-title>Payments don't adds up to the Amount</h2>
    <mat-dialog-content>
      Fix the diffrence in a new row or in the last row?
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true" >Add Row</button>
      <button mat-button [mat-dialog-close]="false" >Last Row</button>
    </mat-dialog-actions>`
})
export class CheckTenuresComponent {
    constructor(public dialogRef: MatDialogRef<CheckTenuresComponent>) {}
}