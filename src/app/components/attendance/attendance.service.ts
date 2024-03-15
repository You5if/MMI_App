import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { CommonService } from '../common.service';
import { AttendanceModel } from './attendance.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService
  ) {     
  }

  sendData(dataToSend: AttendanceModel): Observable<any> {
      if (dataToSend.EmpProfileId === 0) {
          return this.httpclient.post<any>(this._cf.baseUrl + 'EmpAtt/create', dataToSend);
      } else {
          return this.httpclient.post<any>(this._cf.baseUrl + 'EmpAtt/edit', dataToSend);
      }
      
  }

  getEmployeeProfileEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._cf.baseUrl + "EmpAtt/" + id + "/1/1/1/''/''/''").pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
     
}
