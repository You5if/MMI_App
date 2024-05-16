import { Component } from '@angular/core';
import { ReportPageService } from '../report-page/report-page.service';
import { Router } from '@angular/router';
import { ProductService } from '../../components/product/product.service';

@Component({
  selector: 'app-hr-report',
  templateUrl: './hr-report.component.html',
  styleUrl: './hr-report.component.css'
})
export class HrReportComponent {

  months: number[] = [1,2,3,4,5,6,7,8,9,10,11,12]
   years: number[] = [2024, 2025]

   empAttDetMonth: number = 1
   empAttDetYear: number = 2024
   empAttSumMonth: number = 1
   empAttSumYear: number = 2024
   empPayMonth: number = 1
   empPayYear: number = 2024
   payRollMonth: number = 1
   payRollYear: number = 2024

   fromDate: Date = new Date()
   toDate: Date = new Date()

   products: any[] = []

   constructor(
    private _report: ReportPageService,
    private router: Router
   ) {}

   

   fetchReport(id: number, month: number, year: number) {
    console.log(id, month, year);
    
    let restOfUrl: string; 
      restOfUrl = 'month=' + month; 
      restOfUrl = restOfUrl + '&year=' + year;
      this._report.passReportData({ reportId: id!, restOfUrl: restOfUrl! }); 
      this.router.navigate(['system/report-page']);
   }

   fetchIdReport(id: number) {
    
    let restOfUrl: string = '';
      this._report.passReportData({ reportId: id!, restOfUrl: restOfUrl! }); 
      this.router.navigate(['system/report-page']);
   }

   fetchDateReport(id: number, fromDate: Date, toDate: Date) {
    
    let restOfUrl: string;
    restOfUrl = 'from=' + fromDate; 
    restOfUrl = restOfUrl + '&to=' + toDate; 
      this._report.passReportData({ reportId: id!, restOfUrl: restOfUrl! }); 
      this.router.navigate(['system/report-page']);
   }

}
