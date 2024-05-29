import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReportPageService } from '../report-page/report-page.service';
import { ProductService } from '../../components/product/product.service';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-inv-report',
  templateUrl: './inv-report.component.html',
  styleUrl: './inv-report.component.css'
})
export class InvReportComponent {

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

   productId: number = 1

   products: any[] = []

   constructor(
    private _report: ReportPageService,
    private productService: ProductService,
    private global: AppGlobals,
    private router: Router
   ) {}

   ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (value) => {
        this.products = value
      },
      error: (err) => {
        console.error('API Error:', err);
      },
    })
   }

   fetchIdReport(id: number) {
    
    let restOfUrl: string = ''; 
      this._report.passReportData({ reportId: id!, restOfUrl: restOfUrl! }); 
      // this.router.navigate(['system/report-page']);
      window.open(this.global.realappUrl+'/#/system/report-page', '_blank');
   }
   fetchProductReport(id: number, productId: number) {
    
    let restOfUrl: string = ''; 
      restOfUrl = 'productid=' + productId; 
      // restOfUrl = restOfUrl + '&year=' + year;
      this._report.passReportData({ reportId: id!, restOfUrl: restOfUrl! }); 
      // this.router.navigate(['system/report-page']);
      window.open(this.global.realappUrl+'/#/system/report-page', '_blank');
   }

}
