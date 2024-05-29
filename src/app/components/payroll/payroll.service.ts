import { Injectable } from '@angular/core';
import { PayrollModel } from './payroll.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: PayrollModel): Observable<any> {
      if (dataToSend.payRunId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'Payrun/create', dataToSend, this._cf.requestOptions());
      } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'Payrun/edit', dataToSend, this._cf.requestOptions());
      }
      
  }
  lockRecord(dataToSend: any): Observable<any> {
    return this.httpclient.post<any>(this._globals.baseAPIUrl + "PayrollLock/create", dataToSend, this._cf.requestOptions()).pipe(
        map((result: any) => {
        return result;
        }), catchError(this._cf.handleError)
        );
  }
  deleteRecord(dataToSend: PayrollModel): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'Payrun/delete', dataToSend, this._cf.requestOptions());
      
  }

  getEmpDropdown(): Observable<any> {
        
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/empprofileid/vwempprofileindex/empname/active=1/false', this._cf.requestOptions());
    
}
  
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "Payrun/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  
}

