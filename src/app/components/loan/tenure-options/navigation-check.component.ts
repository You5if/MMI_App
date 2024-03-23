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
    selector: 'app-navigate-check',
    template: `<h2 mat-dialog-title>You will lose Progress in form?</h2>
    <!-- <mat-dialog-content>
      Fix the diffrence in a new row or in the last row?
    </mat-dialog-content> -->
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true" >Return</button>
      <button mat-button [mat-dialog-close]="false" >Continue without Saving</button>
    </mat-dialog-actions>`
})
export class NavigateCheckComponent {
    constructor(public dialogRef: MatDialogRef<NavigateCheckComponent>) {}
}