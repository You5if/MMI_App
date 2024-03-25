import { Injectable } from '@angular/core';
import { UsersModel, UsersToDeleteModel, UsersToSendModel } from './users.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: UsersToSendModel): Observable<any> {
      // if (dataToSend.appUserId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'AppUser/create', dataToSend, this._cf.requestOptions());
      // } else {
      //     return this.httpclient.post<any>(this._globals.baseAPIUrl + 'AppUser/edit', dataToSend);
      // }
      
  }
  deleteRecord(dataToSend: UsersToDeleteModel): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'AppUser/delete', dataToSend, this._cf.requestOptions());
      
  }
  deleteRole(dataToSend: any): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'AppUserRole/delete', dataToSend, this._cf.requestOptions()).pipe(
        map((result: any) => {
        return result;
        }), catchError(this._cf.handleError)
        );;
      
  }
  changePassword(dataToSend: any): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'AppUser/changepassword', dataToSend, this._cf.requestOptions()).pipe(
        map((result: any) => {
        return result;
        }), catchError(this._cf.handleError)
        );;
      
  }
  newRole(dataToSend: any): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'AppUserRole/create', dataToSend, this._cf.requestOptions()).pipe(
        map((result: any) => {
        return result;
        }), catchError(this._cf.handleError)
        );;
      
  }

  getUsersEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "AppUser/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  getUserRoles(id: number): Observable<any[]> {
      return this.httpclient.get<any[]>(this._globals.baseAPIUrl + "AppUserRole/" + id + "/0/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any[]) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
     
}