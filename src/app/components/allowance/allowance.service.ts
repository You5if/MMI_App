import { Injectable } from '@angular/core';
import { AllowanceModel, AllowanceToSendModel } from './allowance.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class AllowanceService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: AllowanceToSendModel): Observable<any> {
      if (dataToSend.AllowanceId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'Allowance/create', dataToSend, this._cf.requestOptions());
      } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'Allowance/edit', dataToSend, this._cf.requestOptions());
      }
      
  }
  deleteRecord(dataToSend: AllowanceModel): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'Allowance/delete', dataToSend, this._cf.requestOptions());
      
  }

  getDropdown(): Observable<any> { 
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/Allowanceid/Allowance/Allowancename/active=1 and Allowanceid>1/false', this._cf.requestOptions());
  }
  
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "Allowance/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  
}

