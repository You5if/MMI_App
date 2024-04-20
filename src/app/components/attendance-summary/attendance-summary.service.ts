import { Injectable } from '@angular/core';
import { AttendanceSummaryModel, AttendanceSummaryToSendModel } from './attendance-summary.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceSummaryService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: AttendanceSummaryToSendModel): Observable<any> {
      if (dataToSend.EmpAttActId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EmpAttAct/create', dataToSend, this._cf.requestOptions());
      } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EmpAttAct/edit', dataToSend, this._cf.requestOptions());
      }
      
  }
  deleteRecord(dataToSend: AttendanceSummaryModel): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EmpAttAct/delete', dataToSend, this._cf.requestOptions());
      
  }

  getEmpDropdown(): Observable<any> { 
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/empprofileid/vwempprofileindex/empname/active=1/false', this._cf.requestOptions());
  }
  getLeaveDropdown(): Observable<any> { 
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/leaveid/leave/leavename/active=1 and leaveid>1/false', this._cf.requestOptions());
  }
  
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "EmpAttAct/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  
}



