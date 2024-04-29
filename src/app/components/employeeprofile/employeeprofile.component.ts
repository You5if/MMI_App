import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { EmployeeProfileService } from './employeeprofile.service';
import { MatTableModule } from '@angular/material/table'
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonService } from '../common.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FileListModel } from './upload-file.model';
import { EmployeeModel } from './employeeprofile.model';
import { log } from 'console';
import { CheckDeleteComponent } from '../general-operations/tenure-options/check-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { AppGlobals } from '../../app.global';
import { GlobalService } from '../../global.service';
import { AuthService } from '../../security/auth/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-employeeprofile',
  templateUrl: './employeeprofile.component.html',
  styleUrl: './employeeprofile.component.css'
})
export class EmployeeprofileComponent implements OnInit{
  // local variables 
  public empProfileId = 0;
  public firstName = '';
  public middleName = '';
  public lastName = '';
  public nationalitites: string[] = ['India', 'Sudan', 'Senegal', 'South Africa']; // Sample departments
  public selectedNationality: string = ''; // Variable to store the selected department

  public mail = '';
  public phone = '';
  public phone2 = '';
  public emerContact = '';
  public address = '';

  public departments: string[] = ['Administration', 'Finance', 'Human Resources', 'Engineering and Designing', 'Marketing and Sales', 'Procurements', 'Public Relations', 'Operations', 'Production', 'Services']; // Sample departments
  public selectedDepartment: string = ''; // Variable to store the selected department
  public jobTitles: string[] = ['Accountant', 'Human Resources Officer', 'Draftsman', 'Purchasing Officer', 'Operation Manager', 'Production Manager', 'Foreman', 'Machine Operator', 'Painter', 'Fabricator', 'Wielder', 'Electrition', 'Store Keeper', 'Office Boy', 'Helper']; // Sample departments
  public selectedJobTitle: string = ''; // Variable to store the selected department
  public biomId = '';

  public languages = '';
  public education = '';
  public experience = '';
  public skills = '';
  public attachments = '';
  public trainings = '';
  public certificates = '';
  public insurance = '';
  public inDesc = '';
  public inSt = '';
  public inEnd = '';
  public laborCard = '';
  public laborDesc = '';
  public laborSt = '';
  public laborEn = '';

  public emiratesSt = '';
  public emiratesEn = '';
  public passport = '';
  public passportSt = '';
  public passportEn = '';
  public visa = '';
  public visaDesc = '';
  public visaSt = '';
  public visaEn = '';
  public emiratesId = '';

  uploadStatus!: boolean;
  progress!: number;
  uploadedFile!: FileListModel;

  // screen mode
  screenMode = 'index';

  // index variables
  pTableName = ''
  pTableId: number = 0;
  pUserId: number = 1;
  displayedColumns: string[] = ['select', 'photo', 'empName', 'department', 'jobTitle', 'supervisor', 'biomId', 'phone'];
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
    private empService: EmployeeProfileService,
    private _cf: CommonService,
    private http: HttpClient,
    private dialog: MatDialog,
    private _globals: AppGlobals,
    private globalService: GlobalService,
    private _auth: AuthService,
    private toast: HotToastService,
  ) { 
    this.pTableName = 'EmpProfile';
    this.pTableId = 10;
    this.recordsPerPage = 10;
    this.pUserId = 1;
    this.isLastPage = false;

    this.screenMode = 'index';
  }

  ngOnInit() {
    this.globalService.setNavStatus('system')
    this.screenMode = 'index';
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
    this.dataIsLoaded = false
    // console.log('reached here');
    this._cf.newGetPageData(this.pTableName, this.pageData).subscribe((result: any) => {
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

  onEdit = (id: number) => {
    console.log(id);
    this.empService.getEmployeeProfileEntry(id).subscribe(
      response => {
        console.log('API Response:', response);
        this.empProfileId = response.empProfileId
        this.firstName = response.first;
        this.middleName = response.middle;
        this.lastName = response.last;
        this.mail = response.mail;
        this.phone = response.phone;
        this.phone2 = response.phone2;
        this.emerContact = response.emerContact;
        this.address = response.address;
        this.selectedDepartment = response.department;
        this.biomId = response.biomId;
        this.languages = response.languages;
        this.education = response.education;
        this.experience = response.experience;
        this.attachments = response.attachments
        this.skills = response.skills;
        this.trainings = response.trainings;
        this.certificates = response.certificates;
        this.insurance = response.insurance
        this.inDesc = response.inDesc
        this.inSt = response.inSt
        this.inEnd = response.inEnd
        this.laborCard = response.laborCard
        this.laborDesc = response.laborDesc
        this.laborSt = response.laborSt
        this.laborEn = response.laborEn
        this.emiratesSt = response.emiratesSt;
        this.emiratesEn = response.emiratesEn;
        this.passport = response.passport;
        this.passportSt = response.passportSt;
        this.passportEn = response.passportEn;
        this.visa = response.visa;
        this.visaDesc = response.visaDesc;
        this.visaSt = response.visaSt;
        this.visaEn = response.visaEn;
        this.emiratesId = response.emiratesId;
        this.selectedNationality = response.nationality;
        this.selectedJobTitle = response.jobTitle;
        // this.apiImagePath = response.apiImagePath
        this.apiPath = response.apiPath
        this.extension = response.extension
        this.fileName = response.fileName
        this.fullPath = response.fullPath
        this.originalFileName = response.originalFileName
        
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

  onDelete=  (data: EmployeeModel) => {
    // this.router.navigate(['/user']);
    // console.log(this.firstName);
    var dataToSend: EmployeeModel = data // Example data to send

    console.log(dataToSend);

    if(this.dialog.openDialogs.length==0){
      const dialogRef = this.dialog.open(CheckDeleteComponent, {
       // disableClose: true  
       
     });

     dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log(result);
      if (result) {
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
     })
  }
  }

 



  uploadFile = (files:any) => {
    let fileValidations = 1;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type === "image/jpeg" || files[i].type === "image/png") {
        // do nothing
      } else {
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
          .post(this._globals.baseAPIUrl + "file/upload", formData, {
            reportProgress: true,
            observe: "events"
          })
          .subscribe((event:any) => {
            console.log('valEvent', event);
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
              this.uploadStatus = false;
            } else if (event.type === HttpEventType.Response) {
              const res: any = event.body;
              this.uploadedFile = {
                apiPath: res.apiPath,
                extension: res.extention,
                fileName: res.fileName,
                fullPath: res.fullPath,
                originalFileName: res.originalFileName,
                // apiImagePath: this._globals.baseAPIRootUrl + res.apiPath
                apiImagePath: res.apiImagePath
              };
              this.uploadStatus = true;
              this.onUploadFinished.emit(event.body);
              // this.tmpFilesList.push(this.uploadedFile);
              // this.myFiles.push(this.uploadedFile);
              console.log(JSON.stringify(this.uploadedFile));
              this.user_img = "https://" + this.uploadedFile.fullPath.substring(39)
              // this.apiImagePath = this.uploadedFile.apiImagePath
              this.apiPath = this.uploadedFile.apiPath
              this.extension = this.uploadedFile.extension
              this.fileName = this.uploadedFile.fileName
              this.fullPath = this.uploadedFile.fullPath
              this.originalFileName = this.uploadedFile.originalFileName

              // this.btnClick()
              // this.businessService.imageChange2(this.uploadedFile)
              // this.businessService.imageChange(this.uploadedFile)
              this.message = fileToUpload.name + " upload success!";
            }
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
    this.empProfileId = 0;
    this.firstName = '';
    this.middleName = '';
    this.lastName = '';
    this.mail = '';
    this.phone = '';
    this.phone2 = '';
    this.emerContact = '';
    this.address = '';
    this.selectedDepartment = '';
    this.biomId = '';
    this.languages = '';
    this.education = ''
    this.experience = ''
    this.skills = ''
    this.attachments = ''
    this.trainings = '';
    this.insurance = '';
    this.inDesc = ''
    this.inSt = ''
    this.inEnd = ''
    this.laborCard = '';
    this.laborDesc = ''
    this.laborSt = ''
    this.laborEn = ''
    this.emiratesSt = '';
    this.emiratesEn = '';
    this.passport = '';
    this.passportSt = '';
    this.passportEn = '';
    this.visa = '';
    this.visaDesc = '';
    this.visaSt = '';
    this.visaEn = '';
    this.emiratesId = '';
    this.certificates = ''
    this.selectedJobTitle = '';
    this.selectedNationality = '';
    this.apiPath = ''
        this.extension = ''
        this.fileName = ''
        this.fullPath = ''
        this.originalFileName = ''
        this.user_img = '/path/to/file'
    // console.log(this.firstName);
  }
  

}
