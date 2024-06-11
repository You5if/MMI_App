import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { AppGlobals } from '../../../app.global';
import { AuthService } from '../../../security/auth/auth.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.css'
})
export class SearchFilterComponent {

  searchText: string = ''
  title: string = ''
  tableName: string = ''
   constructor(
     private _auth: AuthService,
     @Inject(MAT_DIALOG_DATA) public data: {
       screenTable: string,
       screenTitle: string
     },
     private _globals: AppGlobals,
     public dialogRef: MatDialogRef<SearchFilterComponent>,
     private toast: HotToastService,
     ) {
      this.title = data.screenTitle
      this.tableName = data.screenTable
   }

   ngOnInit() {
     
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


   onSubmit() {
       const dataResult = {
        text: this.searchText,
        tableName: this.tableName
       }
       this.dialogRef.close(dataResult);
     }

     onClose() {
       this.dialogRef.close("false")
     }

     onClear() {
      const dataResult = {
        text: '',
        tableName: this.tableName
       }
       this.dialogRef.close(dataResult);
     }
}
