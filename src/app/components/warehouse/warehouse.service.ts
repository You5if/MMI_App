import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';
import { WarehouseToSendModel, WarehouseModel } from './warehouse.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: WarehouseToSendModel): Observable<any> {
      if (dataToSend.WarehouseId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'Warehouse/create', dataToSend, this._cf.requestOptions());
      } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'Warehouse/edit', dataToSend, this._cf.requestOptions());
      }
      
  }
  deleteRecord(dataToSend: WarehouseModel): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'Warehouse/delete', dataToSend, this._cf.requestOptions());
      
  }

  getAccDropdown(): Observable<any> { 
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/accountid/account/accname/active=1 and accountid>1/false', this._cf.requestOptions());
  }
  getCentersDropdown(): Observable<any> { 
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/costcenid/costcen/centername/active=1 and costcenid>1/false', this._cf.requestOptions());
  }
  
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "Warehouse/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  
}






