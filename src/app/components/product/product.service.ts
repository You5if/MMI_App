import { Injectable } from '@angular/core';
import { ProductModel, ProductToSendModel } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { AppGlobals } from '../../app.global';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    
  constructor(
      private httpclient: HttpClient,
      private _cf: CommonService,
      private _globals: AppGlobals
  ) {     
  }

  sendData(dataToSend: ProductToSendModel): Observable<any> {
      if (dataToSend.ProductId === 0) {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'Product/create', dataToSend, this._cf.requestOptions());
      } else {
          return this.httpclient.post<any>(this._globals.baseAPIUrl + 'Product/edit', dataToSend, this._cf.requestOptions());
      }
      
  }
  deleteRecord(dataToSend: ProductModel): Observable<any> {
      
      return this.httpclient.post<any>(this._globals.baseAPIUrl + 'Product/delete', dataToSend, this._cf.requestOptions());
      
  }

  getDropdown(): Observable<any> { 
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/accountid/account/accname/active=1 and accountid>1/false', this._cf.requestOptions());
  }

  getProducts(): Observable<any> { 
    return this.httpclient.get<any>(this._globals.baseAPIUrl + 'Ddl/getdropdown/productid/product/prodname/active=1 and productid>1/false', this._cf.requestOptions());
  }
  
  getRecordEntry(id: number): Observable<any> {
      return this.httpclient.get<any>(this._globals.baseAPIUrl + "Product/" + id + "/1/1/1/''/''/''", this._cf.requestOptions()).pipe(
      map((result: any) => {
      return result;
      }), catchError(this._cf.handleError)
      );
  }
  
}



