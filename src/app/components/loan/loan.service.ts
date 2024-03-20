import { Injectable } from '@angular/core';
import { LoanModel } from './loan-models/loan.model';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { CommonService } from '../common.service';
import { LoanToSendModel } from './loan-models/loan-to-send.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(
    private httpclient: HttpClient,
    private _cf: CommonService
  ) { }

  sendData(dataToSend: LoanToSendModel): Observable<LoanToSendModel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwidW5pcXVlX25hbWUiOiJtaWxlc2hAcGFmLmFlIiwiZ2l2ZW5fbmFtZSI6Ik1pbGVzaCBTaGFoIiwibmJmIjoxNzEwOTc1MDIzLCJleHAiOjE3MTEwNjE0MjMsImlhdCI6MTcxMDk3NTAyM30.6u7_nipbDl1OUCIVJY2WWpZZhr14v53SBGrHHKJCxSKOdfWJ7jIgUFz4LHvLHgPO3VIwkGE96eD2dlzLGssz8w`
    })
    if (dataToSend.loanReqEntry.loanReqId === 0) {
        return this.httpclient.post<LoanToSendModel>(this._cf.baseUrl + 'LoanReq/create', dataToSend, {headers: headers});
    } else {
        return this.httpclient.post<LoanToSendModel>(this._cf.baseUrl + 'LoanReq/edit', dataToSend, {headers: headers});
    }
    
}
deleteRecord(dataToSend: LoanModel): Observable<LoanModel> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwidW5pcXVlX25hbWUiOiJtaWxlc2hAcGFmLmFlIiwiZ2l2ZW5fbmFtZSI6Ik1pbGVzaCBTaGFoIiwibmJmIjoxNzEwOTc1MDIzLCJleHAiOjE3MTEwNjE0MjMsImlhdCI6MTcxMDk3NTAyM30.6u7_nipbDl1OUCIVJY2WWpZZhr14v53SBGrHHKJCxSKOdfWJ7jIgUFz4LHvLHgPO3VIwkGE96eD2dlzLGssz8w`
  })
    
    return this.httpclient.post<LoanModel>(this._cf.baseUrl + 'LoanReq/delete', dataToSend, {headers: headers});
    
}

getRecordEntry(id: number): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwidW5pcXVlX25hbWUiOiJtaWxlc2hAcGFmLmFlIiwiZ2l2ZW5fbmFtZSI6Ik1pbGVzaCBTaGFoIiwibmJmIjoxNzEwOTc1MDIzLCJleHAiOjE3MTEwNjE0MjMsImlhdCI6MTcxMDk3NTAyM30.6u7_nipbDl1OUCIVJY2WWpZZhr14v53SBGrHHKJCxSKOdfWJ7jIgUFz4LHvLHgPO3VIwkGE96eD2dlzLGssz8w`
  })
    return this.httpclient.get<any>(this._cf.baseUrl + "LoanReq/" + id + "/1/1/1/''/''/''", {headers: headers}).pipe(
    map((result: any) => {
    return result;
    }), catchError(this._cf.handleError)
    );
}
}
