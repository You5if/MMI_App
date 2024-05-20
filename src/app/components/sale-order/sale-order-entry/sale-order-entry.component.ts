import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { SaleOrderService } from '../sale-order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../../../security/auth/auth.service';
import { CommonService } from '../../common.service';
import { SaveChangesComponent } from '../../general-operations/tenure-options/save-changes.component';
import { PurchaseChildModel } from '../../purchase-order/purchase-models/purchase-child.model';
import { SaleChildModel } from '../models/sale-child.model';
import { SaleToSendModel } from '../models/sale-to-send.model';

@Component({
  selector: 'app-sale-order-entry',
  templateUrl: './sale-order-entry.component.html',
  styleUrl: './sale-order-entry.component.css'
})
export class SaleOrderEntryComponent {

  tenure: number = 0;
  amount: number = 0;
  requestDate = new Date();
  childs: SaleChildModel[] = [];
  deletedChilds: SaleChildModel[] = [];
  loanTypeId!: number;
  purInvId: number = 0;
  employeeId!: number;
  accounts: any[] = []
  costCens: any[] = []

  invCode: string = ''
  invDate =  new Date();
  costCenId: number = 1

  
  
    submitDisable: boolean = false;
  
    @ViewChild('heroForm') ngForm!: NgForm;
  CustomerId: number = 1;
  remarks: string = '';
  warehouseId: number = 1;
  tax: number = 0.00;
  description: string = '';
  isTaxable: boolean = false;
  warehouses: any[] = []
  
    constructor(
      private journalService: SaleOrderService,
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
      this.journalService.getWarehouses().subscribe({
        next: (value) => {
          this.warehouses = value
        },
        error: (err) => {
          console.error('API Error:', err);
        },
      })
      // this.journalService.getDropdown().subscribe({
      //   next: (value) => {
      //     this.accounts = value
      //   },
      //   error: (err) => {
      //     console.error('API Error:', err);
      //   },
      // })
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
                
                this.purInvId = res.SalInvId
                this.invCode = res.InvCode
                this.invDate = res.InvDate
                this.CustomerId = res.CustomerId
                this.remarks = res.Remarks
                this.warehouseId = res.WarehouseId
                this.tax = res.Tax
                this.description = res.Description
                this.isTaxable = res.IsTaxable
                this.childs = res.salInvDetEntries

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
  
    deleteTenure(loanChild: SaleChildModel) {
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
    
          const additionalLoanChild: SaleChildModel = {
            "SalInvDetId": 0,
            "SalInvId": 0,
            "ProductId": 1,
            "Qty": 10.00,
            "SalePrice": 20.00,
            "Discount": 2.00,
            "NetPrice": 180.00,
            "Deleted" : false
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
    var dataToSend: SaleToSendModel = {
      salInvEntry: {
        "SalInvId": this.purInvId,
        "InvCode": this.invCode,
        "InvDate": this.invDate,
        "CustomerId": this.CustomerId,
        "Remarks": this.remarks,
        "WarehouseId": this.warehouseId,
        "Tax": this.tax,
        "Description": this.description,
        "IsTaxable": this.isTaxable,
        "IsTest": this._auth.getIsTest(),
        "Active": true,
        "UserCR": 456,
        "Company": 789,
        "RoleCR": 123,
        "Browser": "Firefox",
        "Device": "Laptop",
        "Resol": "1366x768",
        "TransId": 0
    },
      salInvDetEntries: this.childs
      
  
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
        this.router.navigate(['/system/sale-order'], { relativeTo: this.activeRoute.parent });
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
          this.router.navigate(['/system/sale-order'], { relativeTo: this.activeRoute.parent });
        }
       })
    }
    }else {
      this.router.navigate(['/system/sale-order'], { relativeTo: this.activeRoute.parent });
    }
   
  }
  
  }
  

