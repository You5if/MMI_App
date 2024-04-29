import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';
import { CreditNoteToSendModel, CreditNoteModel } from './credit-note.model';

@Injectable({
  providedIn: 'root'
})
export class CreditNoteService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: CreditNoteToSendModel): Observable<any> {
      if (dataToSend.CreditNoteId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'CreditNote/create', dataToSend, this._cf.requestOptions());
      } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'CreditNote/edit', dataToSend, this._cf.requestOptions());
      }
      
  }
  deleteRecord(dataToSend: CreditNoteModel): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'CreditNote/delete', dataToSend, this._cf.requestOptions());
      
  }

  getDropdown(): Observable<any> { 
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/accountid/account/accname/active=1 and accountid>1/false', this._cf.requestOptions());
  }
  
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "CreditNote/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  
}



