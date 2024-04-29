import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../../../security/auth/auth.service';
import { CommonService } from '../../common.service';
import { SaveChangesComponent } from '../../general-operations/tenure-options/save-changes.component';
import { StockReturnChildModel } from '../models/stock-return-child';
import { StockReturnToSendModel } from '../models/stock-return-to-send.model';
import { StockReturnService } from '../stock-return.service';
import { StockReturnToReqModel } from '../models/stock-return.model';

@Component({
  selector: 'app-stock-return-entry',
  templateUrl: './stock-return-entry.component.html',
  styleUrl: './stock-return-entry.component.css'
})
export class StockReturnEntryComponent {

  tenure: number = 0;
  amount: number = 0;
  requestDate = new Date();
  childs: StockReturnChildModel[] = [];
  deletedChilds: StockReturnChildModel[] = [];
  loanTypeId!: number;
  StockReturnId: number = 0;
  employeeId!: number;
  accounts: any[] = []
  costCens: any[] = []

  StockReturnCode: string = ''
  StockReturnDate =  new Date();
  costCenId: number = 1

  
  
    submitDisable: boolean = false;
  
    @ViewChild('heroForm') ngForm!: NgForm;
  CustomerId: number = 1;
  remarks: string = '';
  fromWarehouse: number = 1;
  toWarehouse: number = 1;
  tax: number = 0.00;
  description: string = '';
  isTaxable: boolean = false;
  purInvId: number = 1;
  payRetMod: string = '';
  toAccount: number = 1;
  journalEntryId: number = 1;
  paid: boolean = false;
  creditNoteId: number = 1;
  
    constructor(
      private journalService: StockReturnService,
      private http: HttpClient,
      private _cf: CommonService,
      private router: Router,
      private activeRoute: ActivatedRoute,
      private cdref: ChangeDetectorRef,
      private dialog: MatDialog,
      private toast: HotToastService,
      private _auth: AuthService,
      ) {
  
    }
  
    ngOnInit():void {
      console.log(this.requestDate);
      this.journalService.getDropdown().subscribe({
        next: (value) => {
          this.accounts = value
        },
        error: (err) => {
          console.error('API Error:', err);
        },
      })
      // this.journalService.getDropdown2().subscribe({
      //   next: (value) => {
      //     this.costCens = value
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
            this.journalService.getRecordEntry(Number(param['id'])).subscribe({
              next: (response) => {
                this.toast.close()
                var res = JSON.parse(response.name)
                console.log('API Response:', res);
                
                this.StockReturnId = res.StockRetId
                this.purInvId = res.PurInvId
                this.StockReturnDate = res.ReturnDate
                this.remarks = res.Remarks
                this.description = res.Description
                this.payRetMod = res.PayRetMod
                this.toAccount = res.ToAccount
                this.journalEntryId = res.JournalEntryId
                this.paid = res.Paid
                this.creditNoteId = res.CreditNoteId
               
                this.childs = res.stockRetDetEntries

                this.childs.map((child) => {
                  child.Deleted = false
                })
  
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
  
     this.cdref.detectChanges()
  
    }
  
    deleteTenure(loanChild: StockReturnChildModel) {
      const index = this.childs.indexOf(loanChild);
      
      if (index >= 0 && index < this.childs.length) {
        this.childs[index].Deleted = true;
        this.deletedChilds.push(this.childs[index]);
        this.childs.splice(index, 1)
    
        console.log(this.childs);
      } else {
        console.log("Invalid loan tenure specified.");
      }
    }
  
    addNewChild() {
    
          const additionalLoanChild: StockReturnChildModel = {
            "StockRetDetId": 0,
        "StockRetId": 0,
        "ProductId": 1,
        "Qty": 10.00,
        "CostPrice": 15.50,
        "NetCost": 150.00,
        "Deleted": false
          };
  
          this.childs.push(additionalLoanChild)
    
    }
  
   
  
    EnterSubmit(event: any) { 
      //keycode for Enter is 13 
      if (event.keyCode === 13) {
  // confirm('Enter key is pressed, form will be submitted'); 
  //calling submit method if key pressed is Enter.
   } if (event.keyCode === 27) {
    this.btnClickCancel()
   }
   console.log(event.keyCode);
  //function to submit the form submitit(form){
    
  }
  
  
  btnClick=  () => {
    // if (this.childs.length >= 2) {
    //   const debits = this.childs.reduce((sum, child) => sum + child.DrAmt, 0);
    // const credits = this.childs.reduce((sum, child) => sum + child.CrAmt, 0);

    // if (debits === credits) {
        this.submitDisable = true
    this.deletedChilds.map((item): any => {
      this.childs.push(item)
    })
    var dataToSend: StockReturnToSendModel = {
      stockRetEntry: {
        "StockRetId": this.StockReturnId,
        "PurInvId": this.purInvId,
        "ReturnDate": this.StockReturnDate,
        "Remarks": this.remarks,
        "Description": this.description,
        "PayRetMod": this.payRetMod,
        "ToAccount": this.toAccount,
        "JournalEntryId": this.journalEntryId,
        "Paid": this.paid,
        "CreditNoteId": this.creditNoteId,
        "IsTest": true,
        "Active": true,
        "UserCR": 456,
        "Company": 789,
        "RoleCR": 123,
        "Browser": "Firefox",
        "Device": "Laptop",
        "Resol": "1366x768",
        "TransId": 0
    },
    stockRetDetEntries: this.childs
      
  
  }// Example data to send
  
    // console.log(JSON.stringify(dataToSend));
    
    this.journalService.sendData(dataToSend).pipe(
      this.toast.observe({
        loading: 'Saving new record...',
        success: (dataR) => `${dataR.errorMessage}`,
        error: (error) => `API Error: ${error.message}`,
      })
    ).subscribe(
      response => {
        console.log('API Response:', response);
        this.router.navigate(['/system/stock-return'], { relativeTo: this.activeRoute.parent });
        // this.screenMode = 'index';
        // Handle the response data here
      },
      error => {
        // console.error('API Error:', error);
        this.submitDisable = false
        // Handle any errors here
      }
    );
    //   }else {
    //     this.toast.error("Debits and Credits are not equal")
    //   }
    // }else {
    //   this.toast.error("Entry records are less than 2")
    // }
  }
  
  
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
          this.router.navigate(['/system/stock-return'], { relativeTo: this.activeRoute.parent });
        }
       })
    }
    }else {
      this.router.navigate(['/system/stock-return'], { relativeTo: this.activeRoute.parent });
    }
   
  }
  
  }
  




