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
    selector: 'app-save-changes',
    template: `<h2 mat-dialog-title>You will lose Progress, Save changes?</h2>
    <!-- <mat-dialog-content>
      Fix the diffrence in a new row or in the last row?
    </mat-dialog-content> -->
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true" >Save</button>
      <button mat-button [mat-dialog-close]="false" >Discard</button>
    </mat-dialog-actions>`
})
export class SaveChangesComponent {
    constructor(public dialogRef: MatDialogRef<SaveChangesComponent>) {}
}