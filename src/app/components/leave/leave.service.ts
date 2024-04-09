import { Injectable } from '@angular/core';
import { LeaveModel, LeaveToSendModel } from './leave.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: LeaveToSendModel): Observable<any> {
      if (dataToSend.LeaveId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'Leave/create', dataToSend, this._cf.requestOptions());
      } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'Leave/edit', dataToSend, this._cf.requestOptions());
      }
      
  }
  deleteRecord(dataToSend: LeaveModel): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'Leave/delete', dataToSend, this._cf.requestOptions());
      
  }

  getDropdown(): Observable<any> { 
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/leaveid/leave/leavename/active=1 and leaveid>1/false', this._cf.requestOptions());
  }
  
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "Leave/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  
}
