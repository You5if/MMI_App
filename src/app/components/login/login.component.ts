import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { UIService } from 'src/app/components/shared/uiservices/UI.service';
// import { MessageBoxService } from 'src/app/components/messagebox/message-box.service';
// import { AuthService2 } from '../myauth.service';
import { Router } from '@angular/router';
// import { UserModule } from '../../user/user.model';

// import { AuthService, GoogleLoginProvider } from 'angular4-social-login';
// import { SDNewKeyModel } from 'src/app/components/dynamic/notactivated/notactivated.model';
// import { NotActivatedService } from 'src/app/components/dynamic/notactivated/notactivated.service';
// import { APIResultModel } from 'src/app/components/misc/APIResult.Model';
// import { UserModel, SDUserModel, SDCompanyModel } from '../../signup/signup.model';
// import { AppGlobals } from 'src/app/app.global';
// import { SignUpService } from '../../signupcont/signup.service';
// import { UploadService } from 'src/app/components/common/upload/upload.service';
// import { SelectModel } from 'src/app/components/misc/SelectModel';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppGlobals } from '../../app.global';
import { AuthService } from '../../security/auth/auth.service';
import { LoginModule } from '../../security/auth/login/login.model';
import { GlobalService } from '../../global.service';
import { HotToastService } from '@ngneat/hot-toast';
// import {
//   MatSnackBar,
//   MatSnackBarHorizontalPosition,
//   MatSnackBarVerticalPosition,
// } from '@angular/material/snack-bar';
// import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  pModel!: LoginModule;
  user: any;
  valUserObject!: any;
  initialCheckup = false;
  userObject!: any;
  companyObject!: any;
  loginUserObject!: LoginModule;
  googleImagePath = '';
  smallScreen!: boolean;
  loging: boolean = false;
  submitDisable: boolean = false;
  // horizontalPosition: MatSnackBarHorizontalPosition= 'end'
  // verticalPosition: MatSnackBarVerticalPosition= 'top'

  constructor(
    // private _ui: UIService,
    // private _msg: MessageBoxService,
    private _auth: AuthService,
    // private _snakBar: MatSnackBar,
    private globalService: GlobalService,
    // private _myService: NotActivatedService,
    private _globals: AppGlobals,
    // private _picService: UploadService,
    // private _signupService: SignUpService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private toast: HotToastService,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

  ngOnInit() {
    this.globalService.setNavStatus('login')
    // this.googleImagePath = this._globals.baseAPIFileUrl+'/resources/images/btn_google_signin_light_normal_web.png';
    this.valUserObject = {
      username: '',
      password: '',
      roleId: 0,
    };
    this.loginUserObject = {
      'username': '',
      'password': '',
      'loginType': 0
    };
    this.userObject = {
      sdUserId: 0,
      sdUserName: '',
      displayName: '',
      password: '',
      externalTypeId: 1,
      externalId: 'app',
      activationStatusId: 60000800001,
      sdCompanyId: 0,
      roleId: 0,
      active: true,
      entryMode: 'A',
      readOnly: false,
      auditColumns: null,
};
this.companyObject = {
  sdCompanyId: 0,
  sdCityId: 0,
  sdCityPostalCodeId: 0,
  address: '',
  otherInformation: '',
  company: '',
  sdCompanyLocation: [],
  active: true,
  entryMode: 'A',
  readOnly: false,
  auditColumns: null,
};
  }

  

  submit(form: NgForm) {
    console.log(1);
    this.submitDisable = true
    
    this.loging = true
    if (form.invalid) {
      // this._msg.FillRequired();
      this.loging = false
      console.log(2);
      return false;
    }
    if (this.validateForm(form) !== true) {
      this.loging = false
      console.log(3);
      return false;
    }
    // this._ui.loadingStateChanged.next(true);
    // this._auth.validateUserName(form.value).subscribe((result: any[]) => {
      // console.log(4);
  //  this._ui.loadingStateChanged.next(false);
      // if (result[0].id !== 0) {
      //   console.log(5);
      //   if (result[0].id === 1) {
          try {
            form.value.loginType = 1;
            this._auth.login(form.value).pipe(
              this.toast.observe({
                loading: 'Checking user information...',
                success: (data) => 'Logged in successfully',
                error: (error) => `Error: ${error.message}`,
              })
            ).subscribe((data: any) => {
              console.log(6);
              if (data !== null) {
                // localStorage.setItem('sdCompanyId', data.companyId.toString());
                this.globalService.setNavStatus('system')
                this.router.navigate(['/system']);
                this.loging = false
                return true;
              } else {
                // console.log('login data',data);
                
                this.loging = false
                // alert("Error!! wrong username or password");
                // this._msg.showError('Unable to login!');
              }
            }, error => {
              this.submitDisable = true
              this.loging = false
              // alert("Error!! wrong username or password");
              // console.log('login data');
              // this._msg.showAPIError(error);
              return false;
            });

          } catch (error) {
            this.submitDisable = true
            this.loging = false
            // alert("Error!! wrong username or password");
            // this._msg.showAPIError(error);
            return false;
          }
      //   }
      //   else {
      //     this.loging = false
      //     this.router.navigate(['/googlelogin']);
      //   }
      // }
    // });

  }

  validateForm(form: NgForm) {
    if (form.value.username === '' || form.value.username === null) {
      // this._msg.blank('Email address');
      return false;
    }
    if (form.value.password === '' || form.value.password === null) {
      // this._msg.blank('Password');
      return false;
    }

    return true;
  }

  
}
