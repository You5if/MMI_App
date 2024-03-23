import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, FormControl, FormGroupDirective, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalService } from '../../global.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;

}
@Component({
  selector: 'app-testwork',
  templateUrl: './testwork.component.html',
  styleUrl: './testwork.component.css'
})
export class TestworkComponent {
  title = 'MMI_app';

  isSideNavCollapsed = false;
  screenWidth = 0;

  navStatus: String = 'login'

  constructor(
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    this.globalService.navStatus$.subscribe(n => this.navStatus = n)
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

}
