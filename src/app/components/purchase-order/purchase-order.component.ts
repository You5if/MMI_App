import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { PurchaseModel } from './purchase-models/purchase.model';
import { PurchaseOrderService } from './purchase-order.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../../security/auth/auth.service';
import { CommonService } from '../common.service';
import { FileListModel } from '../employeeprofile/upload-file.model';
import { CheckDeleteComponent } from '../general-operations/tenure-options/check-delete.component';
import { FilterByComponent } from '../general-operations/filter-by/filter-by.component';
import { SearchFilterComponent } from '../general-operations/search-filter/search-filter.component';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrl: './purchase-order.component.css'
})
export class PurchaseOrderComponent {

  // local variables 
  
  uploadStatus!: boolean;
  progress!: number;
  uploadedFile!: FileListModel;

  // screen mode
  screenMode = 'index';
  searchText: string = ''
  nameFilter: string = ""
  dateFilter: string = ""
  // index variables
  sort: string = ""
  filter: string  =""
  pTableName = ''
  pTableId: number = 0;
  pUserId: number = 1;
  displayedColumns: string[] = ['journCode', 'journDate', 'tax', 'Remarks', 'select'];
  dataSource: any;
  isLastPage = false;
  recordsPerPage: number | undefined;
  currentPageIndex: number | undefined;
  totalRecords!: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageData: any
@ViewChild(MatPaginator) paginator!: MatPaginator;
  dataIsLoaded: boolean = false
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
    private loanService: PurchaseOrderService,
    private _cf: CommonService,
    private http: HttpClient,
    private dialog: MatDialog,
    private _auth: AuthService,
    private toast: HotToastService,
  ) { 
    this.pTableName = 'PurInv';
    this.pTableId = 56;
    this.recordsPerPage = 10;
    this.pUserId = 1;
    this.isLastPage = false;

    this.screenMode = 'index';
  }

  ngOnInit() {
    // preparing index call parameters
    this.pageData = {
      tableId: this.pTableId,
      userId: Number(this._auth.getUserId()), //later to change to take from token _auth.getUserId(),
      recordsPerPage: this.recordsPerPage,
      pageNo: 1,
      transId: 1,
      lastPage: this.isLastPage,
      company: 1,
      roleId: Number(this._auth.getRole()),
      browser: '',
      resol: '',
      device: '',
      isTest: this._auth.getIsTest(), // must take with roleid(change) and is key to fetching data
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

  logout() {
    this._auth.logout()
  }

  refreshMe() {
    this.dataSource = []
    this.dataIsLoaded = false
    // console.log('reached here');
    this._cf.newGetPageData(this.pTableName, this.pageData, this.sort, this.filter).subscribe((result: PurchaseModel[]) => {
      // this._ui.loadingStateChanged.next(false);
      this.dataIsLoaded = true
      // this._ui.loadingStateChanged.next(false);
      this.totalRecords = result[0].totalRecords;
      this.recordsPerPage = this.recordsPerPage;
      this.dataSource = result;
      // console.log('Reached here!');
      // console.log(result);
    })
  }

  onAsc(text: string) {
    this.sort = text + ' asc'
    this.refreshMe()
    }
    onDesc(text: string) {
    this.sort = text + ' desc'
    this.refreshMe()
    }
    onClearSort() {
    this.sort = ""
    this.refreshMe()
    }


    onClearAll() {
      this.searchText = ''
    this.sort = ""
    this.filter = ""
    this.refreshMe()
    }

    onFilterBySearch(table: string, title: string) {
      if(this.dialog.openDialogs.length==0){
        const dialogRef = this.dialog.open(SearchFilterComponent, {
         disableClose: true,
         data: {
          screenTable: table,
          screenTitle: title
         }
       });
  
       dialogRef.afterClosed().subscribe((result: any) => {
        console.log(result);
        // if (result.tableName === 'empname') {
        //   // console.log(result.text);
        //   if (result.text != '') {
        //     const term = "'%"+result.text+"%'"
        //   const encodedSearchTerm = encodeURIComponent(term);
        //   this.empNameFilter = result.tableName+" like "+encodedSearchTerm
        //   }else {
        //     this.empNameFilter = ''
        //   }
        // }
        this.onSearch(result.text)
      }
       )}
      }
  
    onSearch(text: string) {
      console.log(text);
      const textToSearch = text.replace("'", "''")
      const term = "'%"+textToSearch+"%'"
      const encodedSearchTerm = encodeURIComponent(term);
      this.nameFilter = "invcode like "+encodedSearchTerm
      if (this.dateFilter === "") {
        this.filter = this.nameFilter
        console.log(this.filter);
        
        this.refreshMe()
      }else {
        this.filter = this.nameFilter + " and "+ this.dateFilter
        console.log(this.filter);
        this.refreshMe()
      }
  
    }
    onClearSearch() {
      this.searchText = ''
      this.nameFilter = ""
      if (this.nameFilter === "" && this.dateFilter != "") {
        this.filter = this.dateFilter
        console.log(this.filter);
        
        this.refreshMe()
      }else if (this.nameFilter != "" && this.dateFilter === "") {
        this.filter = this.nameFilter
        console.log(this.filter);
        this.refreshMe()
      }else if (this.nameFilter != "" && this.dateFilter != "") {
        this.filter = this.nameFilter + " and "+ this.dateFilter
        console.log(this.filter);
        this.refreshMe()
      }else if (this.nameFilter === "" && this.dateFilter === "") {
        this.filter = ""
        console.log(this.filter);
        this.refreshMe()
      }
        console.log(this.filter);
        
        this.refreshMe()
    }

    onFilterByDate() {
      if(this.dialog.openDialogs.length==0){
        const dialogRef = this.dialog.open(FilterByComponent, {
         disableClose: true,
        //  data: {
        //   parentScreen: "Attendance"
        //  }
       });
  
       dialogRef.afterClosed().subscribe((result: string) => {
        console.log(result);
        if (result != "false") {
        this.dateFilter = "invdate "+result
        if (this.nameFilter === "" && this.dateFilter != "") {
          this.filter = this.dateFilter
          console.log(this.filter);
          
          this.refreshMe()
        }else if (this.nameFilter != "" && this.dateFilter === "") {
          this.filter = this.nameFilter
          console.log(this.filter);
          this.refreshMe()
        }else if (this.nameFilter != "" && this.dateFilter != "") {
          this.filter = this.nameFilter + " and "+ this.dateFilter
          console.log(this.filter);
          this.refreshMe()
        }else if (this.nameFilter === "" && this.dateFilter === "") {
          this.filter = ""
          console.log(this.filter);
          this.refreshMe()
        }
        // this.adjustLoanDistribution(result);
      }
       })
      }
    }

  paginatoryOperation(event: PageEvent ): any {
    console.log(event);
    try {
      this.pageData.recordsPerPage = event.pageSize
      this.pageData.pageNo = event.pageIndex+1;
      console.log('records: ', event.pageSize);
      this._cf.newGetPageDataOnPaginatorOperation(event, this.pTableName, this.pageData, this.sort, this.filter).subscribe(
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


  
  

  onDelete=  (data: PurchaseModel) => {
    // this.router.navigate(['/user']);
    // console.log(this.firstName);
    var dataToSend: PurchaseModel = data // Example data to send

    dataToSend.transId = 0
    console.log(dataToSend);

    if(this.dialog.openDialogs.length==0){
      const dialogRef = this.dialog.open(CheckDeleteComponent, {
       // disableClose: true  
       
     });

     dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log(result);
      if (result) {
        this.loanService.deleteRecord(dataToSend).pipe(
          this.toast.observe({
            loading: 'Deleting record...',
            success: (data) => `${data.errorMessage}`,
            error: (error) => `Error: ${error.error.message}`,
          })
        ).subscribe(
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
