import { Injectable } from '@angular/core';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
// import getMAC, { isMAC } from 'getmac';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../../components/common.service';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { AuthService2 } from './myauth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken: any;
  userRole: any;
  decodedToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private _globals: AppGlobals,
    private _cf: CommonService,
    private jwtHelperService: JwtHelperService,
    // private _auth: AuthService2,
    private router: Router
  ) { }

  login(model: any): Observable<any> {
    console.log(model);
    
    return this.http.post<any>(this._globals.baseAPIUrl + 'User/login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          console.log(user);
          //step 4 of security(next: login.model.ts)
          localStorage.setItem(this._globals.baseAppName + '_token', user.token);
          // console.log('Token: '+localStorage.getItem(this._globals.baseAppName + '_token'));
          // console.log('User', user);
          localStorage.setItem('role', user.roleId.toString());
          this.userRole = user.roleId.toString();
          localStorage.setItem('sdCompanyId', user.companyId.toString());
          this.userRole = user.roleId.toString();
          this.userToken = user.token;
          this.decodedToken = this.jwtHelper.decodeToken(user.token);

          return response;
        } else {
          return null;
        }
      }), catchError(this._cf.handleError)
    );
  }

  loggedIn() {
    const mToken: any = this.jwtHelperService.tokenGetter();
    // return !!mToken;
    return !this.jwtHelperService.isTokenExpired(mToken);
  }

  validateUserName(data: any): Observable<any[]> {
    return this.http.post(this._globals.baseAPIUrl + 'User/ValidateUserName', data, this._cf.requestOptions()).pipe(
      map((response: any) => {
      return response;
      }), catchError(this._cf.handleError));
  }

  logout() {
    console.log(localStorage);
    console.log("cought in logout");
    this.userToken = null;
    this.userRole = null;
    this.decodedToken = null;
    localStorage.removeItem(this._globals.baseAppName + '_token');
    localStorage.removeItem('sdCompanyId');
    localStorage.removeItem('role');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getRole() {
    console.log(this.userRole);
    return this.userRole;
  }

  getToken() {
    return localStorage.getItem(this._globals.baseAppName + '_token');
  }

  getUserId() {
    // return 26;
    return this.jwtHelperService.decodeToken(this.getToken()!).nameid;
  }

  getUserName() {
    return this.jwtHelperService.decodeToken(this.getToken()!).given_name;
  }

  getUniqueName() {
    return this.jwtHelperService.decodeToken(this.getToken()!).unique_name;
  }

  getDeviceType() {
    let x = '';
    try {
      x = window.clientInformation.platform;
    } catch(error) {
      x = 'unindentified';
    }
    return x;
  }

  getHostName() {
    return 'unidentified';
  }

  getIPAddress() {
    return 'unidentified';
  }

  getMACAddress() {
    return 'unidentified';
  }

  getScreenRights(pMenuId: number) {
    return this.http.post(this._globals.baseAPIUrl + 'menu/getScreenRights/' +
      this.getUserId() + '/' + pMenuId, [], this._cf.requestOptions()).pipe(
      map((response: any) => {
          return response;
      }), catchError(this._cf.handleError)
    );
  }

  // getAuditColumns() {
  //   const data = new AuditModel (
  //     1100001,
  //     10001,
  //     201,
  //     1,
  //     this.getUserId(),
  //     this.getMACAddress(),
  //     this.getHostName(),
  //     this.getIPAddress(),
  //     this.getDeviceType()
  //   );
  //   return data;
  // }

}
