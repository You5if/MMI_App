import { Injectable } from '@angular/core';
import { EarnModel, EarnToSendModel } from './other-earning.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class OtherDeductionService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: EarnToSendModel): Observable<any> {
      if (dataToSend.EarnDedId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EarnDed/create', dataToSend, this._cf.requestOptions());
      } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EarnDed/edit', dataToSend, this._cf.requestOptions());
      }
      
  }
  deleteRecord(dataToSend: EarnModel): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EarnDed/delete', dataToSend, this._cf.requestOptions());
      
  }

  getEmpDropdown(): Observable<any> {
        
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/empprofileid/vwempprofileindex/empname/active=1 and empprofileid>1 and istest=0 and hasleft=0/false', this._cf.requestOptions());
    
}
  
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "EarnDed/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  
}
