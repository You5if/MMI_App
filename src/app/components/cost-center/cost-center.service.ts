import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';
import { CostCenterToSendModel, CostCenterModel } from './cost-center.model';

@Injectable({
  providedIn: 'root'
})
export class CostCenterService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: CostCenterToSendModel): Observable<any> {
      if (dataToSend.CostCenId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'CostCen/create', dataToSend, this._cf.requestOptions());
      } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'CostCen/edit', dataToSend, this._cf.requestOptions());
      }
      
  }
  deleteRecord(dataToSend: CostCenterModel): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'CostCen/delete', dataToSend, this._cf.requestOptions());
      
  }

  getGroupsDropdown(): Observable<any> { 
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/costcengrid/costcengr/groupname/active=1 and costcengrid>1/false', this._cf.requestOptions());
  }
  
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "CostCen/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  
}



