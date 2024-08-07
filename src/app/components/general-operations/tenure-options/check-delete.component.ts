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
    template: `<h2 mat-dialog-title>Are you sure?</h2>
    <mat-dialog-content>
      This record will be deleted permanently
    </mat-dialog-content>
    <mat-dialog-actions  style="display: flex; flex-direction: row;  justify-content: flex-end;">
      <button mat-button [mat-dialog-close]="true" >Yes</button>
      <button mat-button [mat-dialog-close]="false" >No</button>
    </mat-dialog-actions>`
})
export class CheckDeleteComponent {
    constructor(public dialogRef: MatDialogRef<CheckDeleteComponent>) {}
}