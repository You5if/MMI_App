import { Injectable } from '@angular/core';
import { AppGlobals } from '../../app.global';

@Injectable({
  providedIn: 'root'
})

export class ReportPageService {
  reportId!: number;
  restOfUrl!: string;

  constructor(
    private global: AppGlobals
  ) { }

  passReportData(data: any) {
    localStorage.setItem(this.global.baseAPIUrl + 'reportId', data.reportId)
    localStorage.setItem(this.global.baseAPIUrl + 'restOfUrl', data.restOfUrl)
    // this.reportId = Number(localStorage.getItem(this.global.baseAPIUrl + 'reportId'));
    // this.restOfUrl = localStorage.getItem(this.global.baseAPIUrl + 'restOfUrl') || '';
  }

  getReportData() {
    this.reportId = Number(localStorage.getItem(this.global.baseAPIUrl + 'reportId'));
    this.restOfUrl = localStorage.getItem(this.global.baseAPIUrl + 'restOfUrl') || '';
    const data = { reportId: this.reportId, restOfUrl: this.restOfUrl };
    return data;
  }



}
