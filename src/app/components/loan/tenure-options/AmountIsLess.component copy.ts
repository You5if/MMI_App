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
    selector: 'app-amount-less',
    template: `<h2 mat-dialog-title>Payments are Greater than loan's Amount</h2>
    <!-- <mat-dialog-content>
      Fix the diffrence in a new row or in the last row?
    </mat-dialog-content> -->
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true" >Auto fix Payments</button>
      <button mat-button [mat-dialog-close]="false" >cancel</button>
    </mat-dialog-actions>`
})
export class AmountIsLessComponent {
    constructor(public dialogRef: MatDialogRef<AmountIsLessComponent>) {}
}