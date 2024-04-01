import { Injectable } from '@angular/core';
import { DayWorkingHoursModel } from './day-working-hours.model';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class DayWorkingHoursService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: DayWorkingHoursModel): Observable<any> {
      if (dataToSend.MonthWDayId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'MonthWDay/create', dataToSend, this._cf.requestOptions());
      } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'MonthWDay/edit', dataToSend, this._cf.requestOptions());
      }
      
  }
  deleteRecord(dataToSend: DayWorkingHoursModel): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'MonthWDay/delete', dataToSend, this._cf.requestOptions());
      
  }
  
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "MonthWDay/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  
}
