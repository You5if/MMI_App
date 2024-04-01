import { Component } from "@angular/core";
import {
    MatDialog,
    MatDialogRef,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  } from '@angular/material/dialog';
import { UsersService } from "../users/users.service";
import { AuthService } from "../../security/auth/auth.service";
import { AppGlobals } from "../../app.global";

@Component({
    selector: 'app-save-changes',
    styleUrl: './change-role.component.css',
    template: `<h2 mat-dialog-title>Select your role</h2>
    <mat-dialog-content>
      <div *ngFor="let role of roles">
      <div class="example-margin" *ngIf="role.appRoleId != roleLS">
                    <h3>role: {{role.appRoleId}}</h3>
                    <button mat-raised-button color="primary" (click)="onToggle(role.appRoleId)">Activate</button>
                </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <!-- <button mat-button [mat-dialog-close]="true" >Change</button> -->
      <button mat-button [mat-dialog-close]="false" >Close</button>
    </mat-dialog-actions>`
})
export class ChangeRoleComponent {
  roles: any[]
  roleLS: number = Number(localStorage.getItem(this._globals.baseAppName + '_role'))
    constructor(
      private service: UsersService,
      private _auth: AuthService,
      private _globals: AppGlobals,
      public dialogRef: MatDialogRef<ChangeRoleComponent>
      ) {

    }

    ngOnInit() {
      this.service.getUserRoles(this._auth.getUserId()).subscribe((reponse) => {
        this.roles = reponse
      })
    }

    onToggle (roleId: number) {
      localStorage.setItem(this._globals.baseAppName + '_role', roleId.toString());
      this.dialogRef.close(true)
    }
}