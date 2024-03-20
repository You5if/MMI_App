import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { LoanService } from './loan.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonService } from '../common.service';
import { HttpClient } from '@angular/common/http';
import { LoanModel } from './loan-models/loan.model';
import { FileListModel } from '../employeeprofile/upload-file.model';
import { MatDialog } from '@angular/material/dialog';
import { CheckDeleteComponent } from './tenure-options/check-delete.component';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrl: './loan.component.css'
})
export class LoanComponent {

  // local variables 
  
  uploadStatus!: boolean;
  progress!: number;
  uploadedFile!: FileListModel;

  // screen mode
  screenMode = 'index';

  // index variables
  pTableName = ''
  pTableId: number = 0;
  pUserId: number = 1;
  displayedColumns: string[] = ['select', 'empName'];
  dataSource: any;
  isLastPage = false;
  recordsPerPage: number | undefined;
  currentPageIndex: number | undefined;
  totalRecords!: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageData: any
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  message: string = "";
  @Output() public onUploadFinished = new EventEmitter();
  user_img: string = "/path/to/file";
  apiImagePath: string = "";
  apiPath: string = ""; 
  extension: string = "";
  fileName: string = "";
  fullPath: string = "";
  originalFileName: string = "";


  constructor(
    private loanService: LoanService,
    private _cf: CommonService,
    private http: HttpClient,
    private dialog: MatDialog,
  ) { 
    this.pTableName = 'LoanReq';
    this.pTableId = 27;
    this.recordsPerPage = 10;
    this.pUserId = 1;
    this.isLastPage = false;

    this.screenMode = 'index';
  }

  ngOnInit() {
    // preparing index call parameters
    this.pageData = {
      tableId: this.pTableId,
      userId: this.pUserId, //later to change to take from token _auth.getUserId(),
      recordsPerPage: this.recordsPerPage,
      pageNo: 1,
      transId: 1,
      lastPage: this.isLastPage,
      company: 1,
      roleId: 1,
      browser: '',
      resol: '',
      device: '',
      isTest: true, // must take with roleid(change) and is key to fetching data
      sort: '',
      filter: ""
    }
    this.refreshMe();
  }

  // ngAfterViewInit() {
  //   // After the view has initialized, focus on the first input field
  //   // console.log('This is after rendering, LOL!');
  //   const firstMatInputElement = document.querySelector('.mat-input-element');

  //   if (firstMatInputElement instanceof HTMLElement) {
  //     // Focus on the first mat-input-element
  //     firstMatInputElement.focus();
  //   } else {
  //     // console.log('No element with the class "mat-input-element" found.');
  //   }
  //   setTimeout(() => {
  //     const firstMatInputElement = document.querySelector('.mat-input-element');
    
  //     if (firstMatInputElement instanceof HTMLElement) {
  //       // Focus on the first mat-input-element
  //       firstMatInputElement.focus();
  //     } else {
  //       // console.log('No element with the class "mat-input-element" found.');
  //     }
  //   }, 1500); // Adjust the delay as needed

  // }

  refreshMe() {
    // console.log('reached here');
    this._cf.newGetPageData(this.pTableName, this.pageData).subscribe((result: LoanModel[]) => {
      // this._ui.loadingStateChanged.next(false);
      this.totalRecords = result[0].totalRecords;
      this.recordsPerPage = this.recordsPerPage;
      this.dataSource = result;
      // console.log('Reached here!');
      // console.log(result);
    })
  }

  paginatoryOperation(event: PageEvent ): any {
    console.log(event);
    try {
      this.pageData.recordsPerPage = event.pageSize
      this.pageData.pageNo = event.pageIndex+1;
      console.log('records: ', event.pageSize);
      this._cf.newGetPageDataOnPaginatorOperation(event, this.pTableName, this.pageData).subscribe(
          (result: any) => {
            //this._ui.loadingStateChanged.next(false);
            this.totalRecords = result[0].totalRecords;
            this.recordsPerPage = event.pageSize;
            console.log(result);
            this.dataSource = result;
          }, (error: any) => {
            //this._ui.loadingStateChanged.next(false);
            //this._msg.showAPIError(error);
            console.log(error);
            return false;
          });
      
    } catch (error:any) {
      //this._ui.loadingStateChanged.next(false);
      //this._msg.showAPIError(error);
      console.log(error);
      return false;
    }
  }


  
  

  onDelete=  (data: LoanModel) => {
    // this.router.navigate(['/user']);
    // console.log(this.firstName);
    var dataToSend: LoanModel = data // Example data to send

    dataToSend.transId = 0
    console.log(dataToSend);

    if(this.dialog.openDialogs.length==0){
      const dialogRef = this.dialog.open(CheckDeleteComponent, {
       // disableClose: true  
       
     });

     dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log(result);
      if (result) {
        this.loanService.deleteRecord(dataToSend).subscribe(
          response => {
            console.log('API Response:', response);
            this.refreshMe();
            this.screenMode = 'index';
            // Handle the response data here
          },
          error => {
            console.error('API Error:', error);
            // Handle any errors here
          }
        );
      }
     })
  }
    
  }

  

}
