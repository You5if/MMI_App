import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppGlobals } from "../../../app.global";
import { CommonService } from "../../common.service";


@Injectable({
  providedIn: 'root'
})
export class RefreshAttanceService {

  constructor(
    private httpclient: HttpClient,
    private _cf: CommonService, 
    private _globals: AppGlobals,

  ) { }

  
    refreshAtt(obj: any): Observable<any> {
        return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EmpAtt/refreshatt', obj, this._cf.requestOptions());
    }
    payrollRun(obj: any): Observable<any> {
        return this.httpclient.post<any>(this._globals.baseAPIUrl + 'Payrun/runpayroll', obj, this._cf.requestOptions());
    }


}
