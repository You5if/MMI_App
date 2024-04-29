import { style } from '@angular/animations';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { GlobalService } from '../../global.service';
import { AuthService } from '../../security/auth/auth.service';
import { ChangeRoleComponent } from '../general-operations/change-role.component';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../users/changepassword.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  constructor(
    private globalService: GlobalService,
    private cdref: ChangeDetectorRef,
    private _auth: AuthService,
    private dialog: MatDialog,
    private toast: HotToastService,
    private router: Router,
  ) {}

  navClass: string = 'body'
  // navStatus: String = 'body'
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  ngOnInit() {
    this.globalService.navStatus$.subscribe(n => {
      if (n === 'login') {
        this.navClass = 'login-body'
      }else {
        this.navClass = 'body'
      }
    })
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
 }

 logout() {
  this._auth.logout()
  // console.log(this._auth.getRole());
  
}

showToast() {
  this.toast.show('Hello World!');
  this.toast.loading('Lazyyy...');
  this.toast.success('Yeah!!');
  this.toast.warning('Boo!');
  this.toast.error('Oh no!');
  this.toast.info('Something...');
}

changePassword=  () => {
  // this.router.navigate(['/user']);
  // console.log(this.firstName);
  // var dataToSend: UsersToDeleteModel = data // Example data to send
  // dataToSend.TransId = 0
  // console.log(dataToSend);

  if(this.dialog.openDialogs.length==0){
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
     disableClose: true,
     data: { 
      appUserId: this._auth.getUserId(),
      password: ''
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
          // this.refreshMe();
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

update() {
  // saveSettings
  //   .pipe(
  //     this.toast.observe({
  //       loading: 'Saving...',
  //       success: 'Settings saved!',
  //       error: 'Could not save.',
  //     })
  //   )
  //   .subscribe();
}

changeRole() {
  // console.log(this._auth.getIsTest());
  if(this.dialog.openDialogs.length==0){
    const dialogRef = this.dialog.open(ChangeRoleComponent, {
     // disableClose: true  
     
   });

   dialogRef.afterClosed().subscribe((result: boolean) => {
    console.log(result);
    if (result) {
      this.router.navigate(['/system']);
      // location.reload()
    }
   })
}
  
}


  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768){
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}
