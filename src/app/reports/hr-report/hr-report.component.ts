import { Component } from '@angular/core';
import { ReportPageService } from '../report-page/report-page.service';
import { Router } from '@angular/router';
import { ProductService } from '../../components/product/product.service';
import { AgreementService } from '../../components/agreement/agreement.service';
import moment from 'moment';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-hr-report',
  templateUrl: './hr-report.component.html',
  styleUrl: './hr-report.component.css'
})
export class HrReportComponent {

  months: number[] = [1,2,3,4,5,6,7,8,9,10,11,12]
   years: number[] = [2024, 2025]
   genders: string[] = ["Male", "Female"]

   empAttDetMonth: number = 1
   empAttDetYear: number = 2024
   empAttSumMonth: number = 1
   empAttSumYear: number = 2024
   empPayMonth: number = 1
   empPayYear: number = 2024
   IncentiveMonth: number = 1
   IncentiveYear: number = 2024
   payRollMonth: number = 1
   payRollYear: number = 2024
   absenteeismMonth: number = 1
   absenteeismYear: number = 2024
   monthOvertimeMonth: number = 1
   monthOvertimeYear: number = 2024
   payslipByDeptMonth: number = 1
   payslipByDeptYear: number = 2024
   turnoverByGenMonth: number = 1
   turnoverByGenYear: number = 2024
   turnoverByJobMonth: number = 1
   turnoverByJobYear: number = 2024
   turnoverByDeptMonth: number = 1
   turnoverByDeptYear: number = 2024
   turnoverByAgeMonth: number = 1
   turnoverByAgeYear: number = 2024
   payslipByEmpMonth: number = 1
   payslipByEmpYear: number = 2024
   overtimeMonth: number = 1
   overtimeYear: number = 2024
   leavesMonth: number = 1
   leavesYear: number = 2024

   fromDate: Date = new Date()
   toDate: Date = new Date()
   fromDateDeptTurn: Date = new Date()
   toDateDeptTurn: Date = new Date()
   fromDateGenTurn: Date = new Date()
   toDateGenTurn: Date = new Date()
   fromDateJobTurn: Date = new Date()
   toDateJobTurn: Date = new Date()
   fromDateAgeTurn: Date = new Date()
   toDateAgeTurn: Date = new Date()

   products: any[] = []
   employees: any[] = []

   empIdReport11: number = 1
   empIdReport26: number = 1
   empIdReport12: number = 1
   empIdReport31: number = 1
   empLeaveIdReport: number = 1
   empLoanIdReport: number = 1
   empInvIdReport: number = 1
   empInvIdReport33: number = 1
   empIncidentIdReport: number = 1

   departments: string[] = []
   jobTitles: string[] = []
   selectedDepartment23: string = '';
   selectedDepartment25: string = '';
   selectedDepartment27: string = '';
   selectedDepartment28: string = '';
   selectedDepartment29: string = '';
   selectedDepartment32: string = '';
   selectedDepartment34: string = '';
   selectedDepartment41: string = '';
   selectedGender40: string = '';
   selectedJob42: string = '';

   fromAgeNum: number =  0
   toAgeNum: number =  0
   
   constructor(
    private AgreementServcie: AgreementService,
    private _report: ReportPageService,
    private _global: AppGlobals,
    private router: Router
   ) {}

   ngOnInit(): void {
    this.departments = this._global.departments
    this.jobTitles = this._global.jobTitles
    this.AgreementServcie.getReportHrEmpDropdown().subscribe({
      next: (value) => {
        this.employees = value
      },
      error: (err) => {
        console.error('API Error:', err);
      },
    })
   }

   

   fetchReport(id: number, month: number, year: number) {
    console.log(id, month, year);
    
    let restOfUrl: string; 
      restOfUrl = 'month=' + month; 
      restOfUrl = restOfUrl + '&year=' + year;
      this._report.passReportData({ reportId: id!, restOfUrl: restOfUrl! }); 
      // this.router.navigate(['system/report-page']);
      window.open('https://inventoryreports.autopay-mcs.com/default.aspx?reportid=' + id + '&' + restOfUrl, '_blank');
   }

   fetchEmpDateReport(id: number,empId: number, month: number, year: number) {
    console.log(id, month, year);
    
    let restOfUrl: string; 
      restOfUrl = 'month=' + month; 
      restOfUrl = restOfUrl + '&year=' + year;
      restOfUrl = restOfUrl + '&empid=' + empId;
      this._report.passReportData({ reportId: id!, restOfUrl: restOfUrl! }); 
      // this.router.navigate(['system/report-page']);
      window.open('https://inventoryreports.autopay-mcs.com/default.aspx?reportid=' + id + '&' + restOfUrl, '_blank');
   }
   fetchDeptDateReport(id: number,dept: string, month: number, year: number) {
    console.log(id, month, year);
    
    let restOfUrl: string; 
      restOfUrl = 'month=' + month; 
      restOfUrl = restOfUrl + '&year=' + year;
      restOfUrl = restOfUrl + '&department=' + dept;
      this._report.passReportData({ reportId: id!, restOfUrl: restOfUrl! }); 
      // this.router.navigate(['system/report-page']);
      window.open('https://inventoryreports.autopay-mcs.com/default.aspx?reportid=' + id + '&' + restOfUrl, '_blank');
   }
   fetchGenDateReport(id: number,gen: string, month: number, year: number) {
    console.log(id, month, year);
    
    let restOfUrl: string; 
      restOfUrl = 'month=' + month; 
      restOfUrl = restOfUrl + '&year=' + year;
      restOfUrl = restOfUrl + '&gender=' + gen;
      this._report.passReportData({ reportId: id!, restOfUrl: restOfUrl! }); 
      // this.router.navigate(['system/report-page']);
      window.open('https://inventoryreports.autopay-mcs.com/default.aspx?reportid=' + id + '&' + restOfUrl, '_blank');
   }
   fetchJobDateReport(id: number,job: string, month: number, year: number) {
    console.log(id, month, year);
    
    let restOfUrl: string; 
      restOfUrl = 'month=' + month; 
      restOfUrl = restOfUrl + '&year=' + year;
      restOfUrl = restOfUrl + '&jobtitle=' + job;
      this._report.passReportData({ reportId: id!, restOfUrl: restOfUrl! }); 
      // this.router.navigate(['system/report-page']);
      window.open('https://inventoryreports.autopay-mcs.com/default.aspx?reportid=' + id + '&' + restOfUrl, '_blank');
   }
   fetchAgeDateReport(id: number,fromDate: Date, toDate: Date, fromAge: number, toAge: number) {
    console.log(id, fromDate, toDate);
    
    let restOfUrl: string; 
      restOfUrl = 'fromdate=' + moment(fromDate, 'MM-DD-YYYY', true).format("YYYY-MM-DD"); 
      restOfUrl = restOfUrl + '&todate=' + moment(toDate, 'MM-DD-YYYY', true).format("YYYY-MM-DD"); 
      restOfUrl = restOfUrl + '&fromage=' + fromAge;
      restOfUrl = restOfUrl + '&toage=' + toAge;
      this._report.passReportData({ reportId: id!, restOfUrl: restOfUrl! }); 
      // this.router.navigate(['system/report-page']);
      window.open('https://inventoryreports.autopay-mcs.com/default.aspx?reportid=' + id + '&' + restOfUrl, '_blank');
   }

   fetchIdReport(id: number) {
    
    let restOfUrl: string = '';
      this._report.passReportData({ reportId: id!, restOfUrl: restOfUrl! }); 
      window.open('https://inventoryreports.autopay-mcs.com/default.aspx?reportid=' + id + '&' + restOfUrl, '_blank');
      // this.router.navigate(['system/report-page']);
   }

   fetchDateReport(id: number, fromDate: Date, toDate: Date) {
    
    let restOfUrl: string;
    restOfUrl = 'fromdate=' + moment(fromDate, 'MM-DD-YYYY', true).format("YYYY-MM-DD"); 
    restOfUrl = restOfUrl + '&todate=' + moment(toDate, 'MM-DD-YYYY', true).format("YYYY-MM-DD"); 
      this._report.passReportData({ reportId: id!, restOfUrl: restOfUrl! }); 
      // this.router.navigate(['system/report-page']);
      window.open('https://inventoryreports.autopay-mcs.com/default.aspx?reportid=' + id + '&' + restOfUrl, '_blank');
   }
   fetchDeptRangeDateReport(id: number, text:string, fromDate: Date, toDate: Date) {
    
    let restOfUrl: string;
    restOfUrl = 'fromdate=' + moment(fromDate, 'MM-DD-YYYY', true).format("YYYY-MM-DD"); 
    restOfUrl = restOfUrl + '&todate=' + moment(toDate, 'MM-DD-YYYY', true).format("YYYY-MM-DD"); 
    restOfUrl = restOfUrl + '&department=' + text; 
      this._report.passReportData({ reportId: id!, restOfUrl: restOfUrl! }); 
      // this.router.navigate(['system/report-page']);
      window.open('https://inventoryreports.autopay-mcs.com/default.aspx?reportid=' + id + '&' + restOfUrl, '_blank');
   }
   fetchGenRangeDateReport(id: number, text:string, fromDate: Date, toDate: Date) {
    
    let restOfUrl: string;
    restOfUrl = 'fromdate=' + moment(fromDate, 'MM-DD-YYYY', true).format("YYYY-MM-DD"); 
    restOfUrl = restOfUrl + '&todate=' + moment(toDate, 'MM-DD-YYYY', true).format("YYYY-MM-DD"); 
    restOfUrl = restOfUrl + '&gender=' + text; 
      this._report.passReportData({ reportId: id!, restOfUrl: restOfUrl! }); 
      // this.router.navigate(['system/report-page']);
      window.open('https://inventoryreports.autopay-mcs.com/default.aspx?reportid=' + id + '&' + restOfUrl, '_blank');
   }
   fetchJobRangeDateReport(id: number, text:string, fromDate: Date, toDate: Date) {
    
    let restOfUrl: string;
    restOfUrl = 'fromdate=' + moment(fromDate, 'MM-DD-YYYY', true).format("YYYY-MM-DD"); 
    restOfUrl = restOfUrl + '&todate=' + moment(toDate, 'MM-DD-YYYY', true).format("YYYY-MM-DD"); 
    restOfUrl = restOfUrl + '&jobtitle=' + text; 
      this._report.passReportData({ reportId: id!, restOfUrl: restOfUrl! }); 
      // this.router.navigate(['system/report-page']);
      window.open('https://inventoryreports.autopay-mcs.com/default.aspx?reportid=' + id + '&' + restOfUrl, '_blank');
   }

   fetchEmpReport(id: number, empId: number) {
    
    let restOfUrl: string = ''; 
      restOfUrl = 'empid=' + empId; 
      // restOfUrl = restOfUrl + '&year=' + year;
      this._report.passReportData({ reportId: id!, restOfUrl: restOfUrl! }); 
      // this.router.navigate(['system/report-page']);
      window.open('https://inventoryreports.autopay-mcs.com/default.aspx?reportid=' + id + '&' + restOfUrl, '_blank');
   }

   fetchDeptReport(id: number, dept: string) {
    
    let restOfUrl: string = ''; 
      restOfUrl = 'department=' + dept; 
      // restOfUrl = restOfUrl + '&year=' + year;
      this._report.passReportData({ reportId: id!, restOfUrl: restOfUrl! }); 
      // this.router.navigate(['system/report-page']);
      window.open('https://inventoryreports.autopay-mcs.com/default.aspx?reportid=' + id + '&' + restOfUrl, '_blank');
   }


}
