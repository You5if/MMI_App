import { Injectable } from '@angular/core';
import { EmpLeaveModel, EmpLeaveToSendModel } from './employee-leave.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLeaveService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: EmpLeaveToSendModel): Observable<any> {
      if (dataToSend.EmpLeaveId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EmpLeave/create', dataToSend, this._cf.requestOptions());
      } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EmpLeave/edit', dataToSend, this._cf.requestOptions());
      }
      
  }
  deleteRecord(dataToSend: EmpLeaveModel): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EmpLeave/delete', dataToSend, this._cf.requestOptions());
      
  }

  getEmpDropdown(): Observable<any> { 
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/empprofileid/vwempprofileindex/empname/active=1/false', this._cf.requestOptions());
  }
  getLeaveDropdown(): Observable<any> { 
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/leaveid/leave/leavename/active=1 and leaveid>1/false', this._cf.requestOptions());
  }
  
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "EmpLeave/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  
}

