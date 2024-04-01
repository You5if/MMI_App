import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from '../common.service';
import { AppGlobals } from '../../app.global';
import { PublicHolidayModel } from './public-holiday.model';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicHolidayService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: PublicHolidayModel): Observable<any> {
      if (dataToSend.publicHolId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'PublicHol/create', dataToSend, this._cf.requestOptions());
      } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'PublicHol/edit', dataToSend, this._cf.requestOptions());
      }
      
  }
  deleteRecord(dataToSend: PublicHolidayModel): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'PublicHol/delete', dataToSend, this._cf.requestOptions());
      
  }
  
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "PublicHol/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  
}