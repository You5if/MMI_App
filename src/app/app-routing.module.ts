import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CoupensComponent } from './components/coupens/coupens.component';
import { PagesComponent } from './components/pages/pages.component';
import { MediaComponent } from './components/media/media.component';
import { SettingsComponent } from './components/settings/settings.component';
import { app } from '../../server';
import { EmployeeprofileComponent } from './components/employeeprofile/employeeprofile.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { EmpEntryComponent } from './components/employeeprofile/emp-entry/emp-entry.component';
import { LoanComponent } from './components/loan/loan.component';
import { LoanEntryComponent } from './components/loan/loan-entry/loan-entry.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './security/auth/auth-guard';
import { TestworkComponent } from './components/testwork/testwork.component';
import { UsersComponent } from './components/users/users.component';
import { UsersEntryComponent } from './components/users/users-entry/users-entry.component';
import { UsersRolesComponent } from './components/users/users-roles/users-roles.component';
import { PublicHolidayComponent } from './components/public-holiday/public-holiday.component';
import { PublicHolidayEntryComponent } from './components/public-holiday/public-holiday-entry/public-holiday-entry.component';
import { CompanyWeekendComponent } from './components/company-weekend/company-weekend.component';
import { DayWorkingHoursComponent } from './components/day-working-hours/day-working-hours.component';
import { DayWorkingHoursEntryComponent } from './components/day-working-hours/day-working-hours-entry/day-working-hours-entry.component';
import { AgreementComponent } from './components/agreement/agreement.component';
import { AgreementEntryComponent } from './components/agreement/agreement-entry/agreement-entry.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { InventoryEntryComponent } from './components/inventory/inventory-entry/inventory-entry.component';
import { EmpInventoryComponent } from './components/emp-inventory/emp-inventory.component';
import { EmpInventoryEntryComponent } from './components/emp-inventory/emp-inventory-entry/emp-inventory-entry.component';
import { LeaveComponent } from './components/leave/leave.component';
import { LeaveEntryComponent } from './components/leave/leave-entry/leave-entry.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: "login",
    component: LoginComponent,
    data: { title: "MMI - Login"},
  },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'system', component: TestworkComponent, children: [
    { path: '', redirectTo: 'employeeprofile', pathMatch: 'full' },
    {path: 'employeeprofile', component: EmployeeprofileComponent},
  {path: 'employeeprofile-entry/:id', component: EmpEntryComponent},
  {path: 'employeeattendance', component: AttendanceComponent},
  {path: 'loan', component: LoanComponent},
  {path: 'loan-entry/:id', component: LoanEntryComponent},
  {path: 'publicholiday', component: PublicHolidayComponent},
  {path: 'publicholiday-entry/:id', component: PublicHolidayEntryComponent},
  {path: 'dayworkinghours', component: DayWorkingHoursComponent},
  {path: 'dayworkinghours-entry/:id', component: DayWorkingHoursEntryComponent},
  {path: 'agreement', component: AgreementComponent},
  {path: 'agreement-entry/:id', component: AgreementEntryComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: 'inventory-entry/:id', component: InventoryEntryComponent},
  {path: 'empinventory', component: EmpInventoryComponent},
  {path: 'empinventory-entry/:id', component: EmpInventoryEntryComponent},
  {path: 'leave', component: LeaveComponent},
  {path: 'leave-entry/:id', component: LeaveEntryComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users-entry/:id', component: UsersEntryComponent},
  {path: 'user-roles/:id', component: UsersRolesComponent},
  {path: 'companyweekend', component: CompanyWeekendComponent},
  ]},
  {path: 'products', component: ProductsComponent},
  {path: 'statistics', component: StatisticsComponent},
  {
    path: 'coupens',
    loadChildren: () => import('./components/coupens/coupens.module').then(m => m.CoupensModule)
  },
  {path: 'pages', component: PagesComponent},
  {path: 'media', component: MediaComponent},
  {path: 'settings', component: SettingsComponent}
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
