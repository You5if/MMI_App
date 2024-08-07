import { Injectable } from '@angular/core';
import { EmpInvModel, EmpInvToSend } from './emp-inventory.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class EmpInventoryService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: EmpInvToSend): Observable<any> {
      if (dataToSend.EmpInvId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EmpInv/create', dataToSend, this._cf.requestOptions());
      } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EmpInv/edit', dataToSend, this._cf.requestOptions());
      }
      
  }
  deleteRecord(dataToSend: EmpInvModel): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'EmpInv/delete', dataToSend, this._cf.requestOptions());
      
  }

  getDropdown(): Observable<any> { 
    https://inventoryapi.autopay-mcs.com/api/Ddl/getdropdown/empprofileid/vwempprofileindex/empname/active=1 and empprofileid>1 and istest=0 and hasleft=0/false
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/empprofileid/vwempprofileindex/empname/active=1 and empprofileid>1 and istest=0 and hasleft=0/false', this._cf.requestOptions());
  }
  getDropdownItem(): Observable<any> { 
    return this.httpclient.get<any>(this._globals.baseAPIUrl + "Ddl/getdropdown/productid/product/prodname/active=1 and productid>1 and prodcat='HR'/false", this._cf.requestOptions());
  }
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "EmpInv/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  
}

