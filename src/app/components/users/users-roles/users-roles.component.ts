import { ChangeDetectorRef, Component } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CheckDeleteComponent } from '../../general-operations/tenure-options/check-delete.component';
import { AddRoleComponent } from '../add-role.component';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-users-roles',
  templateUrl: './users-roles.component.html',
  styleUrl: './users-roles.component.css'
})
export class UsersRolesComponent {

  roles: any[] = []

  userId: number;

  dataIsLoaded: boolean = false

  constructor(
    private usersService: UsersService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cdref: ChangeDetectorRef,
    private dialog: MatDialog,
    private toast: HotToastService,
  ) {}

  ngOnInit(): void {
    this.refreshMe()
  }

  refreshMe() {
    this.dataIsLoaded = false
    this.activeRoute.params.subscribe(
      param => {
        if (param['id'] != '0') {
          this.userId = Number(param['id'])
          this.usersService.getUserRoles(Number(param['id'])).subscribe({
            next: (response) => {
              this.dataIsLoaded = true
              this.roles = response
              console.log('API Response:', this.roles);
              
              // this.submitDisable = false
      
            },
            error: (err) => {
              console.error('API Error:', err);
            },
          });
        }
      }
    )
  }

  btnClickCancel() {
    this.router.navigate(['/system/users'], { relativeTo: this.activeRoute.parent });
  }

  onDelete=  (data: any) => {
    // this.router.navigate(['/user']);
    // console.log(this.firstName);
    var dataToSend: any = data // Example data to send
    dataToSend.TransId = 0
    console.log(dataToSend);

    if(this.dialog.openDialogs.length==0){
      const dialogRef = this.dialog.open(CheckDeleteComponent, {
       // disableClose: true  
       
     });

     dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log(result);
      if (result) {
        this.usersService.deleteRole(dataToSend).pipe(
          this.toast.observe({
            loading: 'Deleting record...',
            success: (data) => `${data.errorMessage}`,
            error: (error) => `API Error: ${error.message}`,
          })
        ).subscribe(
          response => {
            console.log('API Response:', response);
           this.refreshMe()
            // Handle the response data here
          },
          error => {
            console.error('API Error:', error);
            // Handle any errors here
          }
        );
      }
     })
  }
  }

  addNewRole=  (id: number) => {
    // this.router.navigate(['/user']);
    // console.log(this.firstName);
    // var dataToSend: UsersToDeleteModel = data // Example data to send
    // dataToSend.TransId = 0
    // console.log(dataToSend);

    if(this.dialog.openDialogs.length==0){
      const dialogRef = this.dialog.open(AddRoleComponent, {
       disableClose: true,
       data: {
        appUserRoleId: 0,
        appUserId: id,
        appRoleId: 0,
        isTest: false,
        active: true,
        company: 1,
        roleCr: 1,
        browser: '',
        device: '',
        resol: '',
        transId: 0,
        userId: 0
    }, 
     });

     dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log(result);
      if (result) {
        // this.usersService.deleteRecord(dataToSend).pipe(
        //   this.toast.observe({
        //     loading: 'Deleting record...',
        //     success: (data) => `${data.errorMessage}`,
        //     error: (error) => `API Error: ${error.message}`,
        //   })
        // ).subscribe(
        //   response => {
        //     console.log('API Response:', response);
            this.refreshMe();
        //     this.screenMode = 'index';
        //     // Handle the response data here
        //   },
        //   error => {
        //     console.error('API Error:', error);
        //     // Handle any errors here
        //   }
        // );
      }
     })
  }
  }

}
