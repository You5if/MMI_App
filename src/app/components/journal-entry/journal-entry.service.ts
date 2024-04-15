import { Injectable } from '@angular/core';
import { JournalToSendModel } from './journal-models/journal-to-send.model';
import { JournalModel, JournalToReqModel } from './journal-models/journal.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class JournalEntryService {

  constructor(
    private httpclient: HttpClient,
    private _cf: CommonService, 
    private _globals: AppGlobals,

  ) { }

  sendData(dataToSend: JournalToSendModel): Observable<any> {
    
    if (dataToSend.journEntryEntry.JournEntryId === 0) {
        return this.httpclient.post<any>(this._globals.baseAPIUrl + 'JournEntry/create', dataToSend, this._cf.requestOptions());
    } else {
        return this.httpclient.post<any>(this._globals.baseAPIUrl + 'JournEntry/edit', dataToSend, this._cf.requestOptions());
    }
    
}
deleteRecord(dataToSend: JournalModel): Observable<any> {
  
    
    return this.httpclient.post<any>(this._globals.baseAPIUrl + 'JournEntry/delete', dataToSend, this._cf.requestOptions());
    
}

getDropdown(): Observable<any> { 
  return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/accountid/account/accname/active=1 and accountid>1/false', this._cf.requestOptions());
}
getDropdown2(): Observable<any> { 
  return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/costcenid/costcen/centername/active=1 and costcenid>1/false', this._cf.requestOptions());
}


getRecordEntry(id: number): Observable<any> {
  
    return this.httpclient.get<any>(this._globals.baseAPIUrl + "JournEntry/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
    map((result: any) => {
    return result;
    }), catchError(this._cf.handleError)
    );
}
}

