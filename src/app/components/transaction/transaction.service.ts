import { Injectable } from '@angular/core';
import { TransactionModel, TransactionToSendModel } from './transaction.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: TransactionToSendModel): Observable<any> {
      if (dataToSend.FundTransId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'FundTrans/create', dataToSend, this._cf.requestOptions());
      } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'FundTrans/edit', dataToSend, this._cf.requestOptions());
      }
      
  }
  deleteRecord(dataToSend: TransactionModel): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'FundTrans/delete', dataToSend, this._cf.requestOptions());
      
  }

  getAccountsDropdown(): Observable<any> { 
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/accountid/account/accname/active=1 and accountid>1/false', this._cf.requestOptions());
  }
  
  
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "FundTrans/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  
}


