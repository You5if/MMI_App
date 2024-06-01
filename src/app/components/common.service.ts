import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, throwError } from "rxjs";
import { APIResultModel } from "./sidenav/helper";
import { PageEvent } from "@angular/material/paginator";
import { AppGlobals } from "../app.global";

@Injectable({
    providedIn: "root",
})
export class CommonService {

    arr: any
  userToken: string | null;

    // baseUrl: string = 'https://inventoryapi.autopay-mcs.com/api/';

    constructor(
        private httpClient: HttpClient,
        private _globals: AppGlobals
    ) {}

    newGetPageData(tableName:string ,arr: any, sort: string, filter: string){
        // console.log('Reached here!');
        if (sort === "") {
          sort = "''"
        }
        if (filter === "") {
          filter = "''"
        } else {
          filter = this.insertWhitespaceBeforeB(filter)
        }
        return this.httpClient.post(this._globals.baseAPIUrl + tableName +"/getpagedata/"+arr.tableId+"/1/"+arr.recordsPerPage+"/"+arr.pageNo+"/1/"+arr.lastPage+"/1/2/''/''/''/"+arr.isTest+"/"+sort+"/"+filter,arr, this.requestOptions()).pipe(
          map((res: any) => res),
          catchError(this.handleError)
        );;
     }

     insertWhitespaceBeforeB(str: string): string {
      const lowercaseIndex = str.indexOf('b');
      const uppercaseIndex = str.indexOf('B');
      
      if (lowercaseIndex !== -1 && uppercaseIndex !== -1) {
        if (lowercaseIndex < uppercaseIndex) {
          if (!this.hasWhiteSpace(str.charAt(lowercaseIndex - 1))) {
            return str.slice(0, lowercaseIndex) + ' ' + str.slice(lowercaseIndex);
          }
        } else {
          if (!str.charAt(uppercaseIndex - 1)) {
            return str.slice(0, uppercaseIndex) + ' ' + str.slice(uppercaseIndex);
          }
        }
      } else if (lowercaseIndex !== -1) {
        if (!this.hasWhiteSpace(str.charAt(lowercaseIndex - 1))) {
          return str.slice(0, lowercaseIndex) + ' ' + str.slice(lowercaseIndex);
        }
      } else if (uppercaseIndex !== -1) {
        if (!str.charAt(uppercaseIndex - 1)) {
          return str.slice(0, uppercaseIndex) + ' ' + str.slice(uppercaseIndex);
        }
      }
      
      return str;
    }

    hasWhiteSpace(s: string): boolean {
      if (/\s/g.test(s)) {
        
        return true;
      }
      return false;

    }


     public requestOptions() {
      //step 3 of security (next: auth.service.ts > login())
      this.userToken = localStorage.getItem(this._globals.baseAppName + "_token");
      const headers = new HttpHeaders({
        authorization: "Bearer " + this.userToken,
        "Content-Type": "application/json",
      });
      console.log(headers);
      return {headers: headers};
    }
     public imageequestOptions() {
      //step 3 of security (next: auth.service.ts > login())
      this.userToken = localStorage.getItem(this._globals.baseAppName + "_token");
      const headers = new HttpHeaders({
        authorization: "Bearer " + this.userToken,
      });
      console.log(headers);
      return {headers: headers};
    }

     public newGetPageDataOnPaginatorOperation(
        event: PageEvent,
        pTableName: string,
        arr: any,
        sort: string,
        filter: string
      ) {
        //this._ui.loadingStateChanged.next(true);
    
        const currentPage = event.pageIndex + 1;
        let isLastPage: boolean;
    
        if (arr.totalRecords === currentPage) {
          isLastPage = true;
        } else {
          isLastPage = false;
        }
    
        this.arr = arr
        return this.newGetPageData(
          pTableName,
          this.arr,
          sort,
          filter
        );
      }

     public handleError(error: any) {
        console.log('Error detected!');
        console.log(error);
        try {
          // const applicationError = error.headers.get("Application-Error");
          // if (applicationError) {
          //   // return throwError(applicationError);
          // }
          // let modelStateErrors = '';
          const mApiError: APIResultModel = {
            id: 0,
            errorNo: 0,
            errorMessage: "",
            documentNo: "",
            sQLErrorLineNo: 0,
            sQLErrorMessage: "",
            sQLErrorNumber: 0,
            sQLErrorSeverity: 0,
            sQLErrorState: 0,
            sQLObjectName: "",
          };
          mApiError.id = 0;
          mApiError.errorNo = 0;
          mApiError.errorMessage = "";
          if (error.status === 401) {
            return throwError("Error 401: Unauthorized access!");
          } else {
            const serverError = error;
            let i = 1;
            if (serverError) {
              // tslint:disable-next-line:forin
              for (const key in serverError) {
                if (serverError[key]) {
                  switch (key) {
                    case "id": {
                      mApiError.id = serverError[key];
                      break;
                    }
                    case "errorNo": {
                      mApiError.errorNo = serverError[key];
                      break;
                    }
                    case "errorMessage": {
                      mApiError.errorMessage = serverError[key];
                      break;
                    }
                    case "documentNo": {
                      mApiError.documentNo = serverError[key];
                      break;
                    }
                    case "sQLErrorNumber": {
                      mApiError.sQLErrorNumber = serverError[key];
                      break;
                    }
                    case "sQLErrorSeverity": {
                      mApiError.sQLErrorSeverity = serverError[key];
                      break;
                    }
                    case "sQLErrorState": { 
                      mApiError.sQLErrorState = serverError[key];
                      break;
                    }
                    case "sQLObjectName": {
                      mApiError.sQLObjectName = serverError[key];
                      break;
                    }
                    case "sQLErrorLineNo": {
                      mApiError.sQLErrorLineNo = serverError[key];
                      break;
                    }
                    default: {
                      mApiError.errorMessage =
                        mApiError.errorMessage + serverError[key] + ";";
                      break;
                    }
                  }
                }
                i = i + 1;
              }
            }
            return throwError(mApiError);
          }
        } catch (error) {
          return throwError(error);
        }
      }

}