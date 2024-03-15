import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map } from "rxjs";
import { CommonService } from "../common.service";
import { EmployeeModel } from "./employeeprofile.model";

@Injectable({
    providedIn: 'root'
})
    
    // Definition of service class
export class EmployeeProfileService {
    
    constructor(
        private httpclient: HttpClient,
        private _cf: CommonService
    ) {     
    }

    sendData(dataToSend: EmployeeModel): Observable<any> {
        if (dataToSend.EmpProfileId === 0) {
            return this.httpclient.post<any>(this._cf.baseUrl + 'EmpProfile/create', dataToSend);
        } else {
            return this.httpclient.post<any>(this._cf.baseUrl + 'EmpProfile/edit', dataToSend);
        }
        
    }

    getEmployeeProfileEntry(id: number): Observable<any> {
        return this.httpclient.get<any>(this._cf.baseUrl + "EmpProfile/" + id + "/1/1/1/''/''/''").pipe(
        map((result: any) => {
        return result;
        }), catchError(this._cf.handleError)
        );
    }
       
}