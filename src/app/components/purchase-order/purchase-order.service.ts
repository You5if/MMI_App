import { Injectable } from '@angular/core';
import { PurchaseToSendModel } from './purchase-models/purchase-to-send.model';
import { PurchaseModel } from './purchase-models/purchase.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  constructor(
    private httpclient: HttpClient,
    private _cf: CommonService, 
    private _globals: AppGlobals,

  ) { }

  sendData(dataToSend: PurchaseToSendModel): Observable<any> {
    
    if (dataToSend.purInvEntry.PurInvId === 0) {
        return this.httpclient.post<any>(this._globals.baseAPIUrl + 'PurInv/create', dataToSend, this._cf.requestOptions());
    } else {
        return this.httpclient.post<any>(this._globals.baseAPIUrl + 'PurInv/edit', dataToSend, this._cf.requestOptions());
    }
    
}
deleteRecord(dataToSend: PurchaseModel): Observable<any> {
  
    
    return this.httpclient.post<any>(this._globals.baseAPIUrl + 'PurInv/delete', dataToSend, this._cf.requestOptions());
    
}

getDropdown(): Observable<any> { 
  return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/accountid/account/accname/active=1 and accountid>1/false', this._cf.requestOptions());
}
getDropdown2(): Observable<any> { 
  return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/costcenid/costcen/centername/active=1 and costcenid>1/false', this._cf.requestOptions());
}


getRecordEntry(id: number): Observable<any> {
  
    return this.httpclient.get<any>(this._globals.baseAPIUrl + "PurInv/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
    map((result: any) => {
    return result;
    }), catchError(this._cf.handleError)
    );
}
}

