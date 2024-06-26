import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';
import { AggToSendModel, AgreementModel } from './agreement.model';

@Injectable({
  providedIn: 'root'
})
export class AgreementService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: AggToSendModel): Observable<any> {
      if (dataToSend.EmpAgreementId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EmpAgreement/create', dataToSend, this._cf.requestOptions());
      } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EmpAgreement/edit', dataToSend, this._cf.requestOptions());
      }
      
  }
  deleteRecord(dataToSend: AgreementModel): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EmpAgreement/delete', dataToSend, this._cf.requestOptions());
      
  }
  getDropdown(): Observable<any> { 
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/empprofileid/vwempprofileindex/empname/active=1 and empprofileid>1 and istest=0 and hasleft=0/false', this._cf.requestOptions());
  }
  
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "EmpAgreement/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  
}
