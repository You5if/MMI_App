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
