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
import { HotToastService } from "@ngneat/hot-toast";

@Component({
    selector: 'app-save-changes',
    styleUrl: './change-role.component.css',
    template: `<h2 mat-dialog-title>Select your role</h2>
    <mat-dialog-content>
      <div *ngIf="!dataIsLoaded">
      <div class="example-margin" >
      <ngx-skeleton-loader [theme]="{width: '200px'}"/>
      <ngx-skeleton-loader />
                </div>
      </div>
      <div *ngIf="dataIsLoaded">
      <div *ngFor="let role of roles">
      <div class="example-margin" *ngIf="role.appRoleId != roleLS">
                    <h3 class="roleW">{{role.appRoleId == 2 ? "Developer" : role.appRoleId == 3 ? "Management" : role.appRoleId == 4 ? "HR manager" : role.appRoleId == 5 ? "Inventory manager" : role.appRoleId == 6 ? "Finance manager" : "IT Role"}}</h3>
                    <button mat-button color="primary" (click)="onToggle(role.appRoleId)">Activate</button>
                </div>
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
  dataIsLoaded: boolean = false
  roleLS: number = Number(localStorage.getItem(this._globals.baseAppName + '_role'))
    constructor(
      private service: UsersService,
      private _auth: AuthService,
      private _globals: AppGlobals,
      public dialogRef: MatDialogRef<ChangeRoleComponent>,
      private toast: HotToastService,
      ) {

    }

    ngOnInit() {
      this.service.getUserRoles(this._auth.getUserId()).pipe(
        this.toast.observe({
          loading: 'Just a moment while getting roles...',
          success: (data) => 'Roles loaded successfully ...!',
          error: (error) => `Error: ${error.error.message}`,
        })
      ).subscribe((reponse) => {
        this.dataIsLoaded = true
        this.roles = reponse
        console.log(this.roles);
        
      })
    }

    onToggle (roleId: number) {
      localStorage.setItem(this._globals.baseAppName + '_role', roleId.toString());
      this.dialogRef.close(true)
    }
}