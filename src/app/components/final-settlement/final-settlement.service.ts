import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';
import { FinalSettleToSendModel, FinalSettleModel } from './final-settlement.model';

@Injectable({
  providedIn: 'root'
})
export class FinalSettlementService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: FinalSettleToSendModel): Observable<any> {
      if (dataToSend.FinalSettleId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'FinalSettle/create', dataToSend, this._cf.requestOptions());
      } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'FinalSettle/edit', dataToSend, this._cf.requestOptions());
      }
      
  }
  deleteRecord(dataToSend: FinalSettleModel): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'FinalSettle/delete', dataToSend, this._cf.requestOptions());
      
  }

  getEmpDropdown(): Observable<any> { 
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/empprofileid/vwempprofileindex/empname/active=1 and empprofileid>1 and istest=0 and hasleft=0/false', this._cf.requestOptions());
  }
  getLeaveDropdown(): Observable<any> { 
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/leaveid/leave/leavename/active=1 and leaveid>1/false', this._cf.requestOptions());
  }
  
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "FinalSettle/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  lockRecord(dataToSend: any): Observable<any> {
    return this.httpclient.post<any>(this._globals.baseAPIUrl + "FinalSettLock/create", dataToSend, this._cf.requestOptions()).pipe(
        map((result: any) => {
        return result;
        }), catchError(this._cf.handleError)
        );
  }
  compSettAudit(dataToSend: any): Observable<any> {
    return this.httpclient.post<any>(this._globals.baseAPIUrl + "FinalSettle/runfinalaudit", dataToSend, this._cf.requestOptions()).pipe(
        map((result: any) => {
        return result;
        }), catchError(this._cf.handleError)
        );
  }
  
}


