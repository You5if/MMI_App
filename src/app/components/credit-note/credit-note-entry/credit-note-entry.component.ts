import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AppGlobals } from '../../../app.global';
import { GlobalService } from '../../../global.service';
import { AuthService } from '../../../security/auth/auth.service';
import { CommonService } from '../../common.service';
import { SaveChangesComponent } from '../../general-operations/tenure-options/save-changes.component';
import { CreditNoteModel, CreditNoteToSendModel } from '../credit-note.model';
import { CreditNoteService } from '../credit-note.service';

@Component({
  selector: 'app-credit-note-entry',
  templateUrl: './credit-note-entry.component.html',
  styleUrl: './credit-note-entry.component.css'
})
export class CreditNoteEntryComponent {

  // local variables 
  

  invId: number = 0
  description: string = ''
  accounts: any[] = []
 

  submitDisable: boolean = false;

  @ViewChild('heroForm') ngForm!: NgForm;
  
  bankId: number = 0;
  branch: string = '';
  address: string = '';
  contactPer: string = '';
  email: string = '';
  phone1: number;
  phone2: number;
  accNo: string = '';
  accountId: number = 101;
  bankName: string = '';
  costCenGrId: number = 0;
  groupName: string = '';
  creditNoteId: number = 0;
  prodFor: string = '';
  refId: number = 1;
  credDate = new Date();
  remarks: string = '';
  amount: number = 0.00;
  attachments: string = '';
  journalEntryId: number = 1;
  uploadStatus: boolean;
  links: any[] = [];
  message: string = '';

  constructor(
    private allowanceServcie: CreditNoteService,
    private http: HttpClient,
    private _cf: CommonService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cdref: ChangeDetectorRef,
    private dialog: MatDialog,private toast: HotToastService,
    private _globals: AppGlobals,
    private globalService: GlobalService,
    private _auth: AuthService,
    ) {

  }

  ngOnInit():void {
    // this.allowanceServcie.getDropdown().subscribe({
    //   next: (value) => {
    //     this.accounts = value
    //   },
    //   error: (err) => {
    //     console.error('API Error:', err);
    //   },
    // })
    this.activeRoute.params.subscribe(
      param => {
        if (param['id'] != '0') {
          this.submitDisable = true
          this.toast.loading('Wait just a moment ...')
          this.allowanceServcie.getRecordEntry(Number(param['id'])).subscribe({
            next: (response: CreditNoteModel) => {
              this.toast.close()
              // var res = JSON.parse(response)
              console.log('API Response:', response);
              this.creditNoteId = response.creditNoteId
              this.prodFor = response.prodFor
              this.refId = response.refId
              this.credDate = response.credDate
              this.description = response.description
              this.remarks = response.remarks
              this.amount = response.amount
              this.attachments = response.attachments;
              if (this.attachments != '') {
                this.links = JSON.parse(this.attachments);
              }
              this.journalEntryId = response.journalEntryId
              
              
              // this.description = response.description
              // this.payEvalFormula = response.payEvalFormula
              this.submitDisable = false
      
            },
            error: (err) => {
              this.submitDisable = false
              console.error('API Error:', err);
            },
          });
        }
      }
    )
   
  }

  
  ngAfterViewInit() {
    // After the view has initialized, focus on the first input field
    // console.log('This is after rendering, LOL!');
    if (typeof document !== 'undefined') {
      const firstMatInputElement = document.getElementById('firstControl');
      
      // Manipulating the DOM here

      if (firstMatInputElement instanceof HTMLElement) {
        // Focus on the first mat-input-element
        firstMatInputElement.focus({
          preventScroll: true
        });
      } else {
        // console.log('No element with the class "mat-input-element" found.');
      }
      setTimeout(() => {
        const firstMatInputElement = document.getElementById('firstControl');
      
        if (firstMatInputElement instanceof HTMLElement) {
          // Focus on the first mat-input-element
          firstMatInputElement.focus({
            preventScroll: true
          });
        } else {
          // console.log('No element with the class "mat-input-element" found.');
        }
      }, 1500); // Adjust the delay as needed
   }

  //  this.cdref.detectChanges()

    

  }

  deleteAttach(id: number) {
    this.links.splice(id, 1)
  }

  EnterSubmit(event: KeyboardEvent) { 
    // event.preventDefault();
    const target = event.target as HTMLElement;
    const tagName = target.tagName.toLowerCase();
    //keycode for Enter is 13 
    console.log(target, tagName);
    if (event.key === "Enter" && tagName !== "input" && tagName !== "mat-select" && tagName !== "mat-checkbox") {
      
        event.preventDefault();
        this.btnClick();
    
// confirm('Enter key is pressed, form will be submitted'); 
//calling submit method if key pressed is Enter.
 } if (event.key === "Escape") {
  this.btnClickCancel()
 }
//  console.log(event.keyCode);
//function to submit the form submitit(form){
  
}

btnClick=  () => {
  this.submitDisable = true
  // this.router.navigate(['/user']);
  // console.log(this.firstName);
  var dataToSend: CreditNoteToSendModel = {
   "CreditNoteId": this.creditNoteId,
  "ProdFor": this.prodFor,
  "RefId": this.refId,
  "CredDate": this.credDate,
  "Description": this.description,
  "Remarks": this.remarks,
  "Amount": this.amount,
  "Attachments": JSON.stringify(this.links),
  "JournalEntryId": this.journalEntryId,
  "IsTest": this._auth.getIsTest(),
        "Active": true,
        "UserCR": Number(this._auth.getUserId()),
        "Company": 789,
        "RoleCR": Number(this._auth.getRole()),
        "Browser": "Firefox",
        "Device": "Laptop",
        "Resol": "1366x768",
        "TransId": 0
}
  
  
  
  ; // Example data to send

  console.log(dataToSend);
  
  this.allowanceServcie.sendData(dataToSend).pipe(
    this.toast.observe({
      loading: 'Saving new record...',
      success: (data) => `${data.errorMessage}`,
      error: (error) => `API Error: ${error.message}`,
    })
  ).subscribe(
    response => {
      console.log('API Response:', response);
      this.router.navigate(['/system/credit-note'], { relativeTo: this.activeRoute.parent });
      // this.screenMode = 'index';
      // Handle the response data here
    },
    error => {
      // console.error('API Error:', error);
      this.submitDisable = false
      // Handle any errors here
    }
  );
}

uploadAttachments(files:any)  {
  console.log(files);
  let fileValidations = 1;
  for (let i = 0; i < files.length; i++) {
    if (files[i].type === "image/jpeg" || files[i].type === "image/png") {
      // do nothing
    } else {
      // fileValidations = 0;
      // console.log("here attavh");
      
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
  // this.uploadStatus = false;
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
        .post(this._globals.baseAPIUrl + "file/upload", formData, this._cf.imageequestOptions())
        .pipe(
          this.toast.observe({
            loading: 'Uploading attachment...',
            success: (data) => 'Attachment uploaded successfully ...!',
            error: (error) => `API Error: ${error.message}`,
          })
        ).subscribe((event) => {
          // console.log('valEvent', event);
          // if (event.type === HttpEventType.UploadProgress) {
          //   this.progress = Math.round((100 * event.loaded) / event.total);
          //   this.uploadStatus = false;
          // } else if (event.type === HttpEventType.Response) {
            const res: any = event;
            const uploadedFile = {
              apiPath: res.apiPath,
              extension: res.extention,
              fileName: res.fileName,
              fullPath: res.fullPath,
              originalFileName: res.originalFileName,
              // apiImagePath: this._globals.baseAPIRootUrl + res.apiPath
              apiImagePath: res.apiImagePath
            };
            this.uploadStatus = true;
            // this.onUploadFinished.emit(event.body);
            // this.tmpFilesList.push(this.uploadedFile);
            // this.myFiles.push(this.uploadedFile);
            // console.log(JSON.stringify(this.uploadedFile));
            this.links.push({
              APIImagePath: uploadedFile.apiImagePath,
              APIPath: uploadedFile.apiPath,
              Extension: uploadedFile.extension,
              FileName: uploadedFile.fileName,
              FullPath: uploadedFile.fullPath,
              OriginalFileName: uploadedFile.originalFileName,
              Link: "https://" + uploadedFile.fullPath.substring(39)
              })
            // this.user_img = "https://" + this.uploadedFile.fullPath.substring(39)
            // this.apiImagePath = this.uploadedFile.apiImagePath
            // this.apiPath = this.uploadedFile.apiPath
            // this.extension = this.uploadedFile.extension
            // this.fileName = this.uploadedFile.fileName
            // this.fullPath = this.uploadedFile.fullPath
            // this.originalFileName = this.uploadedFile.originalFileName

            // this.btnClick()
            // this.businessService.imageChange2(this.uploadedFile)
            // this.businessService.imageChange(this.uploadedFile)
            this.message = fileToUpload.name + " upload success!";
          
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

// btnClickCancel=  () => {
//   // this.router.navigate(['/user']);
//   // this.screenMode = 'index';
//   console.log(this.ngForm.dirty);
//   if (this.ngForm.dirty) {
//     confirm("Save changes?");
//     this.btnClick();
//   }else {
//     this.router.navigate(['../employeeprofile'], { relativeTo: this.activeRoute.parent });
//   }
//   // this.router.navigate(['../employeeprofile'], { relativeTo: this.activeRoute.parent });
 
  
//   // console.log(this.firstName);
// }
btnClickCancel=  () => {
  console.log(this.ngForm.dirty);
  if (this.ngForm.dirty) {
    if(this.dialog.openDialogs.length==0){
      const dialogRef = this.dialog.open(SaveChangesComponent, {
       disableClose: true  
       
     });

     dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.btnClick();
      }else {
        this.router.navigate(['/system/credit-note'], { relativeTo: this.activeRoute.parent });
      }
     })
  }
  }else {
    this.router.navigate(['/system/credit-note'], { relativeTo: this.activeRoute.parent });
  }
 
}

}






