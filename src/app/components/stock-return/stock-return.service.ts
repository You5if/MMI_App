import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';
import { StockReturnModel } from './models/stock-return.model';
import { StockReturnToSendModel } from './models/stock-return-to-send.model';

@Injectable({
  providedIn: 'root'
})
export class StockReturnService {

  constructor(
    private httpclient: HttpClient,
    private _cf: CommonService, 
    private _globals: AppGlobals,

  ) { }

  sendData(dataToSend: StockReturnToSendModel): Observable<any> {
    
    if (dataToSend.stockRetEntry.StockRetId === 0) {
        return this.httpclient.post<any>(this._globals.baseAPIUrl + 'StockRet/create', dataToSend, this._cf.requestOptions());
    } else {
        return this.httpclient.post<any>(this._globals.baseAPIUrl + 'StockRet/edit', dataToSend, this._cf.requestOptions());
    }
    
}
deleteRecord(dataToSend: StockReturnModel): Observable<any> {
  
    
    return this.httpclient.post<any>(this._globals.baseAPIUrl + 'StockRet/delete', dataToSend, this._cf.requestOptions());
    
}

getDropdown(): Observable<any> { 
  return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/accountid/account/accname/active=1 and accountid>1/false', this._cf.requestOptions());
}
getDropdown2(): Observable<any> { 
  return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/costcenid/costcen/centername/active=1 and costcenid>1/false', this._cf.requestOptions());
}

getProducts(): Observable<any> { 
  return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/productid/product/prodname/active=1 and productid>1/false', this._cf.requestOptions());
}


getRecordEntry(id: number): Observable<any> {
  
    return this.httpclient.get<any>(this._globals.baseAPIUrl + "StockRet/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
    map((result: any) => {
    return result;
    }), catchError(this._cf.handleError)
    );
}
}



