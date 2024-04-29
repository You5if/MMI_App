import { Injectable } from '@angular/core';
import { StockOutModel } from './models/stock-out.model';
import { StockOutToSendModel } from './models/stock-out-to-send.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class StockOutService {

  constructor(
    private httpclient: HttpClient,
    private _cf: CommonService, 
    private _globals: AppGlobals,

  ) { }

  sendData(dataToSend: StockOutToSendModel): Observable<any> {
    
    if (dataToSend.stockOutEntry.StockOutId === 0) {
        return this.httpclient.post<any>(this._globals.baseAPIUrl + 'StockOut/create', dataToSend, this._cf.requestOptions());
    } else {
        return this.httpclient.post<any>(this._globals.baseAPIUrl + 'StockOut/edit', dataToSend, this._cf.requestOptions());
    }
    
}
deleteRecord(dataToSend: StockOutModel): Observable<any> {
  
    
    return this.httpclient.post<any>(this._globals.baseAPIUrl + 'StockOut/delete', dataToSend, this._cf.requestOptions());
    
}

getDropdown(): Observable<any> { 
  return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/accountid/account/accname/active=1 and accountid>1/false', this._cf.requestOptions());
}
getDropdown2(): Observable<any> { 
  return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/costcenid/costcen/centername/active=1 and costcenid>1/false', this._cf.requestOptions());
}


getRecordEntry(id: number): Observable<any> {
  
    return this.httpclient.get<any>(this._globals.baseAPIUrl + "StockOut/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
    map((result: any) => {
    return result;
    }), catchError(this._cf.handleError)
    );
}
}


