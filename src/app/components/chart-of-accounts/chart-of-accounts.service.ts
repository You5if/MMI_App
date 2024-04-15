import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { ChartOfAccountsModel, ChartOfAccountsSendModel } from './chart-of-accounts.model';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class ChartOfAccountsService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: ChartOfAccountsSendModel): Observable<any> {
      if (dataToSend.AccountId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'Account/create', dataToSend, this._cf.requestOptions());
      } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'Account/edit', dataToSend, this._cf.requestOptions());
      }
      
  }
  deleteRecord(dataToSend: ChartOfAccountsModel): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'Account/delete', dataToSend, this._cf.requestOptions());
      
  }
  
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "Account/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  
}