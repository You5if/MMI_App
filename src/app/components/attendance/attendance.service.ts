import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { CommonService } from '../common.service';
import { AttendanceModel } from './attendance.model';
import { AppGlobals } from '../../app.global';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: AttendanceModel): Observable<any> {
      if (dataToSend.empAttId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EmpAtt/create', dataToSend);
      } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EmpAtt/edit', dataToSend);
      }
      
  }

  getEmployeeProfileEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "EmpAtt/" + id + "/1/1/1/''/''/''").pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }

  deleteRecord(dataToSend: AttendanceModel): Observable<any> {
        
    return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EmpAtt/delete', dataToSend);
    
}
     
}
