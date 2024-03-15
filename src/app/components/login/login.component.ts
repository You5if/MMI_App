import { Component } from '@angular/core';
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, FormControl, FormGroupDirective, NgForm, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userEmail = '';

  btnClick= function () {
    // this.router.navigate(['/user']);
    console.log('hi');
  };
}
