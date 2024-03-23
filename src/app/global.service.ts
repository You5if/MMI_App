import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private navStatusSubject = new Subject<String>();

  navStatus$ = this.navStatusSubject.asObservable();

  constructor() { }


  public setNavStatus(message: String) {
    return this.navStatusSubject.next(message);
  }
}
