import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonService } from '../common.service';
import { AttendanceModel } from '../attendance/attendance.model';
import { AttendanceService } from '../attendance/attendance.service';
import { FileListModel } from '../employeeprofile/upload-file.model';
import { AppGlobals } from '../../app.global';
import { AuthService } from '../../security/auth/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialog } from '@angular/material/dialog';
import { RefreshAttendanceComponent } from '../general-operations/refresh-attendance/refresh-attendance.component';
import { FilterByComponent } from '../general-operations/filter-by/filter-by.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent implements OnInit {
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
  displayedColumns: string[] = ['select', 'empName', 'department', 'jobTitle', 'checkIn'];
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

  showLoading: boolean = false
  showLoading2: boolean = false



  constructor(
    private empService: AttendanceService,
    private _cf: CommonService,
    private http: HttpClient,
    private _globals: AppGlobals,
    private _auth: AuthService,
    private dialog: MatDialog,
    private toast: HotToastService,
  ) { 
    this.pTableName = 'EmpAtt';
    this.pTableId = 14;
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

  refreshMe() {
    this.dataSource = []
    this.dataIsLoaded = false
    // console.log('reached here');
    this._cf.newGetPageData(this.pTableName, this.pageData, this.sort, this.filter).subscribe((result: any) => {
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

  onProgressCanceled() {
    // Handle the canceled event
    this.showLoading2 = false
  }

  onSearch() {
    console.log(this.searchText);
    const term = "'%"+this.searchText+"%'"
    const encodedSearchTerm = encodeURIComponent(term);
    this.nameFilter = "empname like "+encodedSearchTerm
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
        this.dateFilter = "checkin "+result
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
       })
      }
    }

  

  onKey(event: any) { 
    // if (this.screenMode === 'entry') {
      console.log(event);
      
    // }
  }

  paginatoryOperation(event: PageEvent ): any {
    console.log(event);
    try {
      this.pageData.recordsPerPage = event.pageSize
      this.pageData.pageNo = event.pageIndex+1;
      console.log('records: ', event.pageSize);
      // this.dataSource = []
    // this.dataIsLoaded = false
      this._cf.newGetPageDataOnPaginatorOperation(event, this.pTableName, this.pageData, this.sort, this.filter).subscribe(
          (result: any) => {
            //this._ui.loadingStateChanged.next(false);
            // this.dataIsLoaded = true
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

  onEdit = (id: number) => {
    console.log(id);
    this.empService.getEmployeeProfileEntry(id).subscribe(
      response => {
        console.log('API Response:', response);
       
        
        if (response.fullPath != "/path/to/file") {
          this.user_img = "https://" + response.fullPath.substring(39)
        }else {
          this.user_img = '/path/to/file'
        }

        this.screenMode = 'entry';
      },
      error => {
        console.error('API Error:', error);
        // Handle any errors here
      }
    );
  }

  openRefreshAtt() {
    if(this.dialog.openDialogs.length==0){
      const dialogRef = this.dialog.open(RefreshAttendanceComponent, {
       disableClose: true,
       data: {
        parentScreen: "Attendance"
       }
         
       
     });

     dialogRef.afterClosed().subscribe((result: boolean) => {
      // console.log(result);
      this.showLoading = result
        this.showLoading2 = result
      // this.adjustLoanDistribution(result);
     })
    }
  }


  btnClick=  () => {
    // this.router.navigate(['/user']);
    // console.log(this.firstName);
    
    // console.log(dataToSend);
    
    // this.empService.sendData(dataToSend).pipe(
  //   this.toast.observe({
  //     loading: 'Saving new record...',
  //     success: (data) => `${data.errorMessage}`,
  //     error: (error) => `API Error: ${error.message}`,
  //   })
  // ).subscribe(
    //   response => {
    //     console.log('API Response:', response);
    //     this.refreshMe();
    //     this.screenMode = 'index';
    //     // Handle the response data here
    //   },
    //   error => {
    //     console.error('API Error:', error);
    //     // Handle any errors here
    //   }
    // );
  }

  EnterSubmit(event: any) { 
    //keycode for Enter is 13 
    if (event.keyCode === 13) {
alert('Enter key is pressed, form will be submitted'); 
//calling submit method if key pressed is Enter.
 } if (event.keyCode === 27) {
  this.btnClickCancel()
 }
 console.log(event.keyCode);
//function to submit the form submitit(form){
  
}

  uploadFile = (files:any) => {
    let fileValidations = 1;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type === "text/csv") {
        // do nothing
      } else {
        // console.log(files[i].type);
        
        fileValidations = 0;
      }
    }
    if (fileValidations === 0) {
      files = [];
      // this._msg.showInfoError(
      //   "Info",
      //   "File types not accepted! Upload only JPEG or PNG Images!!"
      // );
      console.log('val');
      
      return;
    }
    this.uploadStatus = false;
    if (files.length === 0) {
      return false;
    }
    // tslint:disable-next-line:prefer-const

    // this.ng2ImgMax.resizeImage(fileToUpload, 400, 300).subscribe( // first way
    // this.ng2ImgMax.compressImage(image, 0.075).subscribe( // second way
    try {
      for (let i = 0; i < files.length; i++) {
        // this._ui.loadingStateChanged.next(true);
        let fileToUpload = <File>files[i];
        const formData = new FormData();
        formData.append("file", fileToUpload, fileToUpload.name);
        this.http
          .post(this._globals.baseAPIUrl + "EmpAtt/uploadattendance", formData, this._cf.imageequestOptions())
          .pipe(
            this.toast.observe({
              loading: 'Uploading file...',
              success: (data: any) => `${data.errorMessage}`,
              error: (error) => `API Error: ${error.message}` ,
            })
          ).subscribe((event:any) => {
            console.log('valEvent', event);
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
              this.uploadStatus = false;
            } else if (event.type === HttpEventType.Response) {
              const res: any = event.body;
              
            }
            this.refreshMe();
            // this.myFiles = this.tmpFilesList;

            // this.childFileListComponent.refreshMe();
            // this._ui.loadingStateChanged.next(false);
          });
        // this.ng2ImgMax.compressImage(fileToUpload, 0.5).subscribe(
        //   result => {
        //     fileToUpload = result;

        // });
      }
      return;
    } catch (error:any) {
      // this._ui.loadingStateChanged.next(false);
      // this._msg.showAPIError(error);
      console.log('catch');
      files = [];
      return false;
    }
  };
  deleteImg = () => {
    this.user_img = '/path/to/file'
              // this.apiImagePath = this.uploadedFile.apiImagePath
              this.apiPath = ''
              this.extension = ''
              this.fileName = ''
              this.fullPath = ''
              this.originalFileName = ''
  }

  btnClickCreate=  () => {
    // this.router.navigate(['/user']);
    this.screenMode = 'entry';
    
  }

  uploadCSV() {
    
  }

  

  onDelete=  (data: AttendanceModel) => {
    // this.router.navigate(['/user']);
    // console.log(this.firstName);
    var dataToSend: AttendanceModel = data // Example data to send

    // console.log(dataToSend);
    dataToSend.transId = 0

    confirm('This record will be deleted permanently!'); 
    
    this.empService.deleteRecord(dataToSend).pipe(
          this.toast.observe({
            loading: 'Deleting record...',
            success: (data) => `${data.errorMessage}`,
            error: (error) => `API Error: ${error.message}`,
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


  btnClickCancel=  () => {
    // this.router.navigate(['/user']);
    this.screenMode = 'index';
    // console.log(this.firstName);
  }
}
