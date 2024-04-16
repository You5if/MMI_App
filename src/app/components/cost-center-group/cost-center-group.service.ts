import { Injectable } from '@angular/core';
import { CostCenterGroupModel, CostCenterGroupToSendModel } from './cost-center-group.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class CostCenterGroupService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: CostCenterGroupToSendModel): Observable<any> {
      if (dataToSend.CostCenGrId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'CostCenGr/create', dataToSend, this._cf.requestOptions());
      } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'CostCenGr/edit', dataToSend, this._cf.requestOptions());
      }
      
  }
  deleteRecord(dataToSend: CostCenterGroupModel): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'CostCenGr/delete', dataToSend, this._cf.requestOptions());
      
  }

  getDropdown(): Observable<any> { 
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/accountid/account/accname/active=1 and accountid>1/false', this._cf.requestOptions());
  }
  
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "CostCenGr/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  
}


