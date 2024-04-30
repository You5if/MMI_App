import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { EmployeeProfileService } from '../employeeprofile.service';
import { FileListModel } from '../upload-file.model';
import { EmployeeModel } from '../employeeprofile.model';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { CommonService } from '../../common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SaveChangesComponent } from '../../general-operations/tenure-options/save-changes.component';
import { MatDialog } from '@angular/material/dialog';
import { AppGlobals } from '../../../app.global';
import { GlobalService } from '../../../global.service';
import { AuthService } from '../../../security/auth/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-emp-entry',
  templateUrl: './emp-entry.component.html',
  styleUrl: './emp-entry.component.css'
})
export class EmpEntryComponent {

  // local variables 
  public empProfileId = 0;
  public firstName = '';
  public middleName = '';
  public lastName = '';
  public nationalitites: string[] = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Korea, North',
    'Korea, South',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Palestine',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe'
  ]; // Sample departments
  public selectedNationality: string = ''; // Variable to store the selected department

  public mail = '';
  public phone = '';
  public phone2 = '';
  public emerContact = '';
  public address = '';
  public gender = true;



  // public departments: string[] = ['HR', 'Finance', 'IT', 'Operations']; // Sample departments
  public selectedDepartment: string = ''; // Variable to store the selected department
  public jobTitles: string[] = ['Painter', 'Fabricator', 'Wielder', 'Accountant']; // Sample departments
  public selectedJobTitle: string = ''; // Variable to store the selected department
  public selectedSupervisor: number = 1
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
  public inSt : Date = new Date();
  public inEnd: Date = new Date();
  public laborCard = '';
  public laborDesc = '';
  public laborSt : Date = new Date();
  public laborEn : Date = new Date();
 
  public emiratesSt : Date= new Date();
  public emiratesEn : Date = new Date();
  public passport = '';
  public passportSt : Date = new Date();
  public passportEn : Date = new Date();
  public visa = '';
  public visaDesc = '';
  public visaSt : Date = new Date();
  public visaEn : Date = new Date();
  public emiratesId = '';
  public supervisorId = 1;
  message: string = "";

  uploadStatus!: boolean;
  progress!: number;
  uploadedFile!: FileListModel;

  user_img: string = "/path/to/file";
  apiImagePath: string = "";
  apiPath: string = "";
  extension: string = "";
  fileName: string = "";
  fullPath: string = "";
  originalFileName: string = "";

  supervisors: any[] = []

  links: any[] = []

  submitDisable: boolean = false;

  departments: [
    "HR",
"Production",
"Finance",
"Operation",
"Engineering and design",
"Administration"
  ]

  @ViewChild('heroForm') ngForm!: NgForm;
  emerPerson: string = '';
  emerRelation: string = '';

  constructor(
    private empService: EmployeeProfileService,
    private http: HttpClient,
    private _cf: CommonService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cdref: ChangeDetectorRef,
    private dialog: MatDialog,
    private _globals: AppGlobals,
    private globalService: GlobalService,
    private _auth: AuthService,
    private toast: HotToastService,
    ) {

  }

  ngOnInit():void {
    this.globalService.setNavStatus('entry')
    this.empService.getDropdown().subscribe({
      next: (value) => {
        this.supervisors = value
      },
      error: (err) => {
        this.submitDisable = false
        console.error('API Error:', err);
      },
    })
    this.activeRoute.params.subscribe(
      param => {
        if (param['id'] != '0') {
          this.submitDisable = true
          this.toast.loading('Wait just a moment ...')
          this.empService.getEmployeeProfileEntry(Number(param['id'])).subscribe({
            next: (response) => {
              this.toast.close()
              this.submitDisable = false
              // console.log('API Response:', response);
              this.empProfileId = response.empProfileId
              this.firstName = response.first;
              this.middleName = response.middle;
              this.lastName = response.last;
              this.mail = response.mail;
              this.phone = response.phone;
              this.phone2 = response.phone2;
              this.emerContact = response.emerContact;
              this.address = response.address;
              this.gender = response.gender
              this.selectedDepartment = response.department;
              this.biomId = response.biomId;
              this.supervisorId = response.supervisor
              this.languages = response.languages;
              this.education = response.education;
              this.experience = response.experience;
              this.attachments = response.attachments;
              if (this.attachments != '') {
                this.links = JSON.parse(this.attachments);
              }
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
              this.emerPerson = response.emerPerson
              this.emerRelation = response.emerRelation
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

  changeGender(arg0: boolean) {
    this.gender = arg0
    }

  ngAfterViewInit() {
    // After the view has initialized, focus on the first input field
    // console.log('This is after rendering, LOL!');
    if (typeof document !== 'undefined') {
      const firstMatInputElement = document.getElementById('firstName');
      
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
        const firstMatInputElement = document.getElementById('firstName');
      
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
        .post(this._globals.baseAPIUrl + "file/upload", formData, this._cf.imageequestOptions())
        .pipe(
          this.toast.observe({
            loading: 'Uploading image...',
            success: (data) => 'Image uploaded successfully ...!',
            error: (error) => `API Error: ${error.message}`,
          })
        ).subscribe((event) => {
          console.log('valEvent', event);
          // if (event.type === HttpEventType.UploadProgress) {
          //   this.progress = Math.round((100 * event.loaded) / event.total);
          //   this.uploadStatus = false;
          // } else if (event.type === HttpEventType.Response) {
            const res: any = event;
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
            // this.onUploadFinished.emit(event.body);
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

deleteAttach(id: number) {
  this.links.splice(id, 1)
}

btnClick=  () => {
  this.submitDisable = true
  // this.router.navigate(['/user']);
  // console.log(this.firstName);
  var dataToSend: EmployeeModel = { 
    "EmpProfileId": this.empProfileId,
    "AppUserName": "JohnDoe",
    "APIImagePath": "example.com\/images",
    "APIPath": this.apiPath,
    "Extension": this.extension,
    "FileName": this.fileName,
    "FullPath": this.fullPath,
    "OriginalFileName": this.originalFileName,
    "First": this.firstName,
    "Middle": this.middleName,
    "Last": this.lastName,
    "Mail": this.mail,
    "Phone": Number(this.phone),
    "Phone2": Number(this.phone2),
    "Address": this.address,
    "Department": this.selectedDepartment,
    "EmployeeId": 987654321,
    "BiomId": Number(this.biomId),
    "EmerContact": Number(this.emerContact),
    "Languages": this.languages,
    "JobTitle": this.selectedJobTitle,
    "Nationality": this.selectedNationality,
    "Gender": this.gender,
    "MaritStatus": "Married",
    "Children": 2,
    "DOB": "1990-01-01T00:00:00Z",
    "Supervisor": this.supervisorId,
    "DOJ": "2020-01-01T00:00:00Z",
    "ContractSt": "2020-01-01T00:00:00Z",
    "ContractEnd": "2022-01-01T00:00:00Z",
    "Education": this.education,
    "Experience": this.experience,
    "Skills": this.skills,
    "Trainings": this.trainings,
    "Certificates": this.certificates,
    "Basic": 5000.00,
    "Earn1": 1000.00,
    "Earn2": 2000.00,
    "Ded1": 500.00,
    "Ded2": 300.00,
    "Attachments": JSON.stringify(this.links),
    "Insurance": this.insurance,
    "InDesc": this.inDesc,
    "InSt": this.inSt,
    "InEnd": this.inEnd,
    "LaborCard": this.laborCard,
    "LaborDesc": this.laborDesc,
    "LaborSt": this.laborSt,
    "LaborEn": this.laborEn,
    "EmiratesId": this.emiratesId,
    "EmiratesSt": this.emiratesSt,
    "EmiratesEn": this.emiratesEn,
    "Passport": this.passport,
    "PassportSt": this.passportSt,
    "PassportEn": this.passportEn,
    "Visa": this.visa,
    "VisaDesc": this.visaDesc,
    "VisaSt": this.visaSt,
    "VisaEn": this.visaEn,
    "EmerPerson": this.emerPerson,
    "EmerRelation": this.emerRelation,
    "IsTest": this._auth.getIsTest(),
    "Active": true,
    "Deleted": false,
    "UserCR": 1,
    "Company": 1,
    "RoleCR": 2,
    "DateCR": "2024-02-20T00:00:00Z",
    "Browser": "Chrome",
    "Device": "Desktop",
    "Resol": "1920x1080",
    "TransId": 0 
  }; // Example data to send

  console.log(dataToSend);
  
  this.empService.sendData(dataToSend).pipe(
    this.toast.observe({
      loading: 'Saving new record...',
      success: (data) => `${data.errorMessage}`,
      error: (error) => `API Error: ${error.message}`,
    })
  ).subscribe(
    response => {
      // console.log('API Response:', response);
      this.router.navigate(['/system/employeeprofile'], { relativeTo: this.activeRoute.parent });
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
        this.router.navigate(['/system/employeeprofile'], { relativeTo: this.activeRoute.parent });
      }
     })
  }
  }else {
    this.router.navigate(['/system/employeeprofile'], { relativeTo: this.activeRoute.parent });
  }
 
}

}
