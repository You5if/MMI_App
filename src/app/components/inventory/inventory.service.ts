import { Injectable } from '@angular/core';
import { InventoryModel, InventoryToSendModel } from './inventory.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: InventoryToSendModel): Observable<any> {
      if (dataToSend.EmpInvListId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EmpInvList/create', dataToSend, this._cf.requestOptions());
      } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EmpInvList/edit', dataToSend, this._cf.requestOptions());
      }
      
  }
  deleteRecord(dataToSend: InventoryModel): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EmpInvList/delete', dataToSend, this._cf.requestOptions());
      
  }
  
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "EmpInvList/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  
}
