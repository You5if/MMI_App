import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, FormControl, FormGroupDirective, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-testwork',
  templateUrl: './testwork.component.html',
  styleUrl: './testwork.component.css'
})
export class TestworkComponent {
  firstNameAutofilled!: boolean;
  lastNameAutofilled!: boolean;

  firstName: any;

  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
}
