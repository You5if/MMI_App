import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, FormControl, FormGroupDirective, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core';
import { LoginComponent } from './components/login/login.component';
import { TestworkComponent } from './components/testwork/testwork.component';
import { BodyComponent } from './components/body/body.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { PagesComponent } from './components/pages/pages.component';
import { MediaComponent } from './components/media/media.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SublevelMenuComponent } from './components/sidenav/sublevel-menu.component';
import { EmployeeprofileComponent } from './components/employeeprofile/employeeprofile.component';
import { EmployeeProfileService } from './components/employeeprofile/employeeprofile.service';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { EmpEntryComponent } from './components/employeeprofile/emp-entry/emp-entry.component';
import { TitleCaseDirective } from './directives/TitleCaseDirective';
import { LoanEntryComponent } from './components/loan/loan-entry/loan-entry.component';
import { LoanComponent } from './components/loan/loan.component';
import { LoanEntryChildComponent } from './components/loan/loan-entry/loan-entry-child/loan-entry-child.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CheckTenuresComponent } from './components/loan/tenure-options/check-tenures.component';
import { AmountIsLessComponent } from './components/loan/tenure-options/AmountIsLess.component copy';
import { SaveChangesComponent } from './components/loan/tenure-options/save-changes.component';
import { CheckDeleteComponent } from './components/loan/tenure-options/check-delete.component';
import { Login2Component } from './security/auth/login/login.component';
import { AppGlobals } from './app.global';
import { AuthGuard } from './security/auth/auth-guard';
import { AuthService } from './security/auth/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { NavigateCheckComponent } from './components/loan/tenure-options/navigation-check.component';
import { UsersComponent } from './components/users/users.component';
import { UsersEntryComponent } from './components/users/users-entry/users-entry.component';
import { UsersRolesComponent } from './components/users/users-roles/users-roles.component';
import { ChangePasswordComponent } from './components/users/changepassword.component';
import { AddRoleComponent } from './components/users/add-role.component';

export function getAccessToken(): string {
  return localStorage.getItem("MMI_token")!;
}
export const jwtConfig = {
  tokenGetter: getAccessToken,
  // local
  // whiteListedDomains: ['localhost:4200']
  // global
  whiteListedDomains: ["89.34.16.77"]
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TestworkComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    ProductsComponent,
    StatisticsComponent,
    PagesComponent,
    MediaComponent,
    SettingsComponent,
    SublevelMenuComponent,
    EmployeeprofileComponent,
    AttendanceComponent,
    EmpEntryComponent,
    TitleCaseDirective,
    LoanComponent,
    LoanEntryComponent,
    LoanEntryChildComponent,
    CheckTenuresComponent,
    AmountIsLessComponent,
    SaveChangesComponent,
    CheckDeleteComponent,
    Login2Component,
    NavigateCheckComponent,
    UsersComponent,
    UsersEntryComponent,
    UsersRolesComponent,
    ChangePasswordComponent,
    AddRoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatTableModule,
    MatDividerModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: jwtConfig
    }),
  ],
  providers: [
    provideClientHydration(),
    provideNativeDateAdapter(),
    provideHttpClient(withFetch()),
    EmployeeProfileService,
    AppGlobals,
    AuthGuard,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
