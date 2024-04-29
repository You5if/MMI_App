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
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/empprofileid/vwempprofileindex/empname/active=1/false', this._cf.requestOptions());
  }
  getDropdownItem(): Observable<any> { 
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/empinvlistid/empinvlist/itemname/active=1 and empinvlistid>1/false', this._cf.requestOptions());
  }
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "EmpInv/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  
}

