import { Injectable } from '@angular/core';
import { CompanyWeekendModel } from './company-weekend.model';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyWeekendService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: CompanyWeekendModel): Observable<any> {
      // if (dataToSend.compWeekendId === 0) {
      //     return this.httpclient.post<any>(this._globals.baseAPIUrl + 'CompWeekend/create', dataToSend, this._cf.requestOptions());
      // } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'CompWeekend/edit', dataToSend, this._cf.requestOptions());
      // }
      
  }
  // deleteRecord(dataToSend: CompanyWeekendModel): Observable<any> {
      
  //     return this.httpclient.post<any>(this._globals.baseAPIUrl + 'CompWeekend/delete', dataToSend, this._cf.requestOptions());
      
  // }
  
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "CompWeekend/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  
}
