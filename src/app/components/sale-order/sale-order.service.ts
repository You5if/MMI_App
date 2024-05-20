import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';
import { SaleModel } from './models/sale.model';
import { SaleToSendModel } from './models/sale-to-send.model';

@Injectable({
  providedIn: 'root'
})
export class SaleOrderService {

  constructor(
    private httpclient: HttpClient,
    private _cf: CommonService, 
    private _globals: AppGlobals,

  ) { }

  sendData(dataToSend: SaleToSendModel): Observable<any> {
    
    if (dataToSend.salInvEntry.SalInvId === 0) {
        return this.httpclient.post<any>(this._globals.baseAPIUrl + 'SalInv/create', dataToSend, this._cf.requestOptions());
    } else {
        return this.httpclient.post<any>(this._globals.baseAPIUrl + 'SalInv/edit', dataToSend, this._cf.requestOptions());
    }
    
}
deleteRecord(dataToSend: SaleModel): Observable<any> {
  
    
    return this.httpclient.post<any>(this._globals.baseAPIUrl + 'SalInv/delete', dataToSend, this._cf.requestOptions());
    
}

getDropdown(): Observable<any> { 
  return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/accountid/account/accname/active=1 and accountid>1/false', this._cf.requestOptions());
}
getDropdown2(): Observable<any> { 
  return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/costcenid/costcen/centername/active=1 and costcenid>1/false', this._cf.requestOptions());
}

getWarehouses(): Observable<any> { 
  return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/warehouseid/warehouse/warename/active=1 and warehouseid>1/false', this._cf.requestOptions());
}


getRecordEntry(id: number): Observable<any> {
  
    return this.httpclient.get<any>(this._globals.baseAPIUrl + "SalInv/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
    map((result: any) => {
    return result;
    }), catchError(this._cf.handleError)
    );
}
}

