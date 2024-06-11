import { Injectable } from '@angular/core';
import { LeaveBalanceModel, LeaveBalanceToSendModel } from './leave-balance.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveBalanceService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: LeaveBalanceToSendModel): Observable<any> {
      if (dataToSend.LeaveBalId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'LeaveBal/create', dataToSend, this._cf.requestOptions());
      } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'LeaveBal/edit', dataToSend, this._cf.requestOptions());
      }
      
  }
  deleteRecord(dataToSend: LeaveBalanceModel): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'LeaveBal/delete', dataToSend, this._cf.requestOptions());
      
  }

  getEmpDropdown(): Observable<any> { 
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/empprofileid/vwempprofileindex/empname/active=1/false', this._cf.requestOptions());
  }
  getLeaveDropdown(): Observable<any> { 
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/leaveid/leave/leavename/active=1 and leaveid>1/false', this._cf.requestOptions());
  }
  
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "LeaveBal/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }

  getLeaveData(id: number): Observable<any> {
    return this.httpclient.get<any>(this._globals.baseAPIUrl + "Leave/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
    map((result: any) => {
    return result;
    }), catchError(this._cf.handleError)
    );
}
  
}


