import { Component, Inject } from "@angular/core";
import {
    MatDialog,
    MatDialogRef,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MAT_DIALOG_DATA,
  } from '@angular/material/dialog';
import { FinalSettlementService } from "../../final-settlement/final-settlement.service";
import { HotToastService } from "@ngneat/hot-toast";
import { AppGlobals } from "../../../app.global";
import { AuthService } from "../../../security/auth/auth.service";
import { HttpClient } from "@angular/common/http";
import { CommonService } from "../../common.service";
import { EmpLeaveModel } from "../../employee-leave/employee-leave.model";
import { EmployeeLeaveService } from "../../employee-leave/employee-leave.service";

@Component({
    selector: 'app-save-changes',
    template: `<h2 mat-dialog-title>Attachments <button class="Btn" type="button" mat-button color="primary" (click)="file2.click()">Upload</button></h2>
    <mat-dialog-content>
    <mat-dialog-content>
    <input  type="file" name="second" #file2 placeholder="Choose file" (change)="uploadAttachments(file2.files)" style="display: none;" multiple>
    
        
        <!-- <div class="card-head"> </div> -->
        <div class="card-body">
            <div *ngFor="let link of links; let i = index">
                <div class="attach-links">
                    <a [href]="link.Link" [download]="link.OriginalFileName" target="_blank">{{link.OriginalFileName}}</a>
                    <button class="Btn" mat-button color="warn" (click)="deleteAttach(i)" type="button">Delete</button>
                </div>
                <mat-divider *ngIf="i+1 != links.length"></mat-divider>
            </div>
        </div>
    
    </mat-dialog-content>
    <mat-dialog-actions style="display: flex; flex-direction: row;  justify-content: flex-end;">
      <button mat-button type="button" [mat-dialog-close]="false" >Close</button>
      <button mat-button type="button" (click)="onSubmit()" >Submit</button>
    </mat-dialog-actions>`
})
export class UploadFromTableComponent {
  newPassword: string;
  uploadStatus!: boolean;
  message: string = "";
  links: any[] = []
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: EmpLeaveModel,
      public dialogRef: MatDialogRef<UploadFromTableComponent>,
      private toast: HotToastService,
      private http: HttpClient,
      private _globals: AppGlobals,
      private _cf: CommonService,
      private _auth: AuthService,
      private usersService: EmployeeLeaveService) {}


      ngOnInit() {
        console.log(this.data);
        this.data.remarks = JSON.stringify(this.data.remarks)
        if (this.data.remarks != '') {
            this.links = JSON.parse(this.data.remarks);
          }
      }

      //Attachment
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
              error: (error) => `Error: ${error.error.message}`,
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
      deleteAttach(id: number) {
        this.links.splice(id, 1)
      }
    onSubmit() {
      const dataToAPI = {
        "EmpLeaveId": this.data.empLeaveId,
        "EmpId": this.data.empId,
        "LeaveId": this.data.leaveId,
        "LeaveDate": this.data.leaveDate,
        "Remarks": JSON.stringify(this.links),
        "IsTest": this._auth.getIsTest(),
        "Active": true,
        "Deleted": false,
        "UserCR": Number(this._auth.getUserId()),
        "Company": 789,
        "RoleCR": Number(this._auth.getRole()),
        "DateCR": "2024-02-28T09:10:00",
        "Browser": "Firefox",
        "Device": "Laptop",
        "Resol": "1366x768",
        "TransId": 0
      };
      this.usersService.sendData(dataToAPI).subscribe(
        response => {
          // console.log('API Response:', response);
          this.toast.success("Record has been Locked")
          this.dialogRef.close(true);
          // Handle the response data here
        },
        error => {
          console.error('API Error:', error);
          // Handle any errors here
        }
      );
    }
}