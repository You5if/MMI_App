import { Injectable } from '@angular/core';
import { LoanModel } from './loan-models/loan.model';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { CommonService } from '../common.service';
import { LoanToSendModel } from './loan-models/loan-to-send.model';
import { AppGlobals } from '../../app.global';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(
    private httpclient: HttpClient,
    private _cf: CommonService, 
    private _globals: AppGlobals,

  ) { }

  sendData(dataToSend: LoanToSendModel): Observable<any> {
    
    if (dataToSend.loanReqEntry.loanReqId === 0) {
        return this.httpclient.post<any>(this._globals.baseAPIUrl + 'LoanReq/create', dataToSend, this._cf.requestOptions());
    } else {
        return this.httpclient.post<any>(this._globals.baseAPIUrl + 'LoanReq/edit', dataToSend, this._cf.requestOptions());
    }
    
}
deleteRecord(dataToSend: LoanModel): Observable<any> {
  
    
    return this.httpclient.post<any>(this._globals.baseAPIUrl + 'LoanReq/delete', dataToSend, this._cf.requestOptions());
    
}

getRecordEntry(id: number): Observable<any> {
  
    return this.httpclient.get<any>(this._globals.baseAPIUrl + "LoanReq/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
    map((result: any) => {
    return result;
    }), catchError(this._cf.handleError)
    );
}
}
