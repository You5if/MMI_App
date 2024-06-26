import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { AppGlobals } from '../../../app.global';
import { CommonService } from '../../common.service';

@Injectable({
  providedIn: 'root'
})
export class PayrollProgressBarService {
  body: any
  constructor(private httpclient: HttpClient,
    private _globals: AppGlobals,
    private _cf: CommonService) {}

  getStatusPayroll(): Observable<any> {
      
    return this.httpclient.post<any>(this._globals.baseAPIUrl + 'Payrun/runpayroll',this.body, this._cf.requestOptions());
    
}
getStatusRefresh(): Observable<any> {
  // console.log(obj);
  
  return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EmpAtt/refreshatt', this.body, this._cf.requestOptions());
}
notRunning(): Observable<any> {
  return this.httpclient.post<any>(this._globals.baseAPIUrl + 'Payrun/runpayroll',this.body , this._cf.requestOptions());
}
  cancelProgress(): Observable<any> {
      
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'ProcessRun/cancel/Payroll loading', this._cf.requestOptions());
    
}
compSettAudit(dataToSend: any): Observable<any> {
  return this.httpclient.post<any>(this._globals.baseAPIUrl + "FinalSettle/runfinalaudit", dataToSend, this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
}
}
