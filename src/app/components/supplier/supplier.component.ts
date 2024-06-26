import { Component, ViewChild } from '@angular/core';
import { SupplierModel } from './supplier.model';
import { SupplierService } from './supplier.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HotToastService } from '@ngneat/hot-toast';
import { AppGlobals } from '../../app.global';
import { AuthService } from '../../security/auth/auth.service';
import { CommonService } from '../common.service';
import { CheckDeleteComponent } from '../general-operations/tenure-options/check-delete.component';
import { SearchFilterComponent } from '../general-operations/search-filter/search-filter.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent {
  
  public middleName = '';
  public lastName = '';

  suppNameFilter: string = ''
  contactperFilter: string = ''

  

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
  displayedColumns: string[] = ['supplier', 'contact', 'email', 'phone', 'select'];
  dataSource: SupplierModel[];
  isLastPage = false;
  recordsPerPage: number | undefined;
  currentPageIndex: number | undefined;
  totalRecords!: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageData: any
@ViewChild(MatPaginator) paginator!: MatPaginator;
  dataIsLoaded: boolean = false
  message: string = "";
  user_img: string = "/path/to/file";
  

  constructor(
    private allowanceService: SupplierService,
    private _cf: CommonService,
    private http: HttpClient,
    private dialog: MatDialog,
    private _globals: AppGlobals,
    private _auth: AuthService,
    private toast: HotToastService,
  ) { 
    this.pTableName = 'Supplier';
    this.pTableId = 53;
    this.recordsPerPage = 10;
    this.pUserId = 1;
    this.isLastPage = false;

    this.screenMode = 'index';
  }

  ngOnInit() {
    this.screenMode = 'index';
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

  refreshMe() {
    this.dataSource = []
    this.dataIsLoaded = false
    // console.log('reached here');
    this._cf.newGetPageData(this.pTableName, this.pageData, this.sort, this.filter).subscribe((result: SupplierModel[]) => {
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

  onKey(event: any) { 
    // if (this.screenMode === 'entry') {
      console.log(event);
      
    // }
  }

  onSearch() {
    // console.log(searchData.text);
    // const term = "'%"+searchData.text+"%'"
    // const encodedSearchTerm = encodeURIComponent(term);
    // this.nameFilter = searchData.query+" like "+encodedSearchTerm
    this.nameFilter = ''
    if (this.suppNameFilter != '') {
      this.nameFilter += this.suppNameFilter
    }
    if (this.contactperFilter != '') {
      if (this.nameFilter != '') {
        this.nameFilter += " and "+this.contactperFilter
      }else {
        this.nameFilter += this.contactperFilter
      }
    }
   
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
      if (result.tableName === 'suppname') {
        // console.log(result.text);
        if (result.text != '') {
          const term = "'%"+result.text+"%'"
        const encodedSearchTerm = encodeURIComponent(term);
        this.suppNameFilter = result.tableName+" like "+encodedSearchTerm
        }else {
          this.suppNameFilter = ''
        }
      }else if (result.tableName === 'contactper') {
        if (result.text != '') {
        // console.log(result.text);
        const term = "'%"+result.text+"%'"
        const encodedSearchTerm = encodeURIComponent(term);
        this.contactperFilter = result.tableName+" like "+encodedSearchTerm
        }else {
          this.contactperFilter = ''
        }
      }
      this.onSearch()
    }
     )}
    }

    onClearAll() {
      this.searchText = ''
    this.sort = ""
    this.filter = ""
    this.refreshMe()
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

  
  onDelete=  (data: SupplierModel) => {
    // this.router.navigate(['/user']);
    // console.log(this.firstName);
    var dataToSend: SupplierModel = data // Example data to send
    dataToSend.transId = 0
    console.log(dataToSend);

    if(this.dialog.openDialogs.length==0){
      const dialogRef = this.dialog.open(CheckDeleteComponent, {
       // disableClose: true 
       
     });

     dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log(result);
      if (result) {
        this.allowanceService.deleteRecord(dataToSend).pipe(
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





