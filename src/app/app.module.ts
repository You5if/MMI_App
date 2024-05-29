import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { LoginComponent } from './components/login/login.component';
import { TestworkComponent } from './components/testwork/testwork.component';
import { BodyComponent } from './components/body/body.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { PagesComponent } from './components/pages/pages.component';
import { MediaComponent } from './components/media/media.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SublevelMenuComponent } from './components/sidenav/sublevel-menu.component';
import { EmployeeprofileComponent } from './components/employeeprofile/employeeprofile.component';
import { EmployeeProfileService } from './components/employeeprofile/employeeprofile.service';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { EmpEntryComponent } from './components/employeeprofile/emp-entry/emp-entry.component';
import { TitleCaseDirective } from './directives/TitleCaseDirective';
import { LoanEntryComponent } from './components/loan/loan-entry/loan-entry.component';
import { LoanComponent } from './components/loan/loan.component';
import { LoanEntryChildComponent } from './components/loan/loan-entry/loan-entry-child/loan-entry-child.component';
import { CheckTenuresComponent } from './components/general-operations/tenure-options/check-tenures.component';
import { AmountIsLessComponent } from './components/general-operations/tenure-options/AmountIsLess.component copy';
import { SaveChangesComponent } from './components/general-operations/tenure-options/save-changes.component';
import { CheckDeleteComponent } from './components/general-operations/tenure-options/check-delete.component';
import { Login2Component } from './security/auth/login/login.component';
import { AppGlobals } from './app.global';
import { AuthGuard } from './security/auth/auth-guard';
import { AuthService } from './security/auth/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { NavigateCheckComponent } from './components/general-operations/tenure-options/navigation-check.component';
import { UsersComponent } from './components/users/users.component';
import { UsersEntryComponent } from './components/users/users-entry/users-entry.component';
import { UsersRolesComponent } from './components/users/users-roles/users-roles.component';
import { ChangePasswordComponent } from './components/users/changepassword.component';
import { AddRoleComponent } from './components/users/add-role.component';
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
import { ChangeRoleComponent } from './components/general-operations/change-role.component';
import { provideHotToastConfig } from '@ngneat/hot-toast';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { EmployeeLeaveEntryComponent } from './components/employee-leave/employee-leave-entry/employee-leave-entry.component';
import { EmployeeLeaveComponent } from './components/employee-leave/employee-leave.component';
import { LeaveBalanceComponent } from './components/leave-balance/leave-balance.component';
import { LeaveBalanceEntryComponent } from './components/leave-balance/leave-balance-entry/leave-balance-entry.component';
import { AllowanceComponent } from './components/allowance/allowance.component';
import { AllowanceEntryComponent } from './components/allowance/allowance-entry/allowance-entry.component';
import { OtherEraningComponent } from './components/other-eraning/other-eraning.component';
import { OtherEraningEntryComponent } from './components/other-eraning/other-eraning-entry/other-eraning-entry.component';
import { OtherDeductionComponent } from './components/other-eraning copy/other-eraning.component';
import { OtherDeductionEntryComponent } from './components/other-eraning copy/other-eraning-entry/other-eraning-entry.component';
import { PayrollComponent } from './components/payroll/payroll.component';
import { IncidentComponent } from './components/incident/incident.component';
import { IncidentEntryComponent } from './components/incident/incident-entry/incident-entry.component';
import { FinalSettlementComponent } from './components/final-settlement/final-settlement.component';
import { FinalSettlementEntryComponent } from './components/final-settlement/final-settlement-entry/final-settlement-entry.component';
import { ChartOfAccountsComponent } from './components/chart-of-accounts/chart-of-accounts.component';
import { ChartOfAccountsEntryComponent } from './components/chart-of-accounts/chart-of-accounts-entry/chart-of-accounts-entry.component';
import { JournalEntryComponent } from './components/journal-entry/journal-entry.component';
import { JournalEntryEntryComponent } from './components/journal-entry/journal-entry-entry/journal-entry-entry.component';
import { TransactionEntryComponent } from './components/transaction/transaction-entry/transaction-entry.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { CostCenterGroupComponent } from './components/cost-center-group/cost-center-group.component';
import { CostCenterGroupEntryComponent } from './components/cost-center-group/cost-center-group-entry/cost-center-group-entry.component';
import { BankComponent } from './components/bank/bank.component';
import { BankEntryComponent } from './components/bank/bank-entry/bank-entry.component';
import { CostCenterComponent } from './components/cost-center/cost-center.component';
import { CostCenterEntryComponent } from './components/cost-center/cost-center-entry/cost-center-entry.component';
import { CostCenterAccountComponent } from './components/cost-center-account/cost-center-account.component';
import { CostCenterAccountEntryComponent } from './components/cost-center-account/cost-center-account-entry/cost-center-account-entry.component';
import { AttendanceSummaryComponent } from './components/attendance-summary/attendance-summary.component';
import { AttendanceSummaryEntryComponent } from './components/attendance-summary/attendance-summary-entry/attendance-summary-entry.component';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { OnlyNumber } from './directives/RemoveNegativeNumbers';
import { SupplierComponent } from './components/supplier/supplier.component';
import { SupplierEntryComponent } from './components/supplier/supplier-entry/supplier-entry.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { WarehouseEntryComponent } from './components/warehouse/warehouse-entry/warehouse-entry.component';
import { ProductComponent } from './components/product/product.component';
import { ProductEntryComponent } from './components/product/product-entry/product-entry.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerEntryComponent } from './components/customer/customer-entry/customer-entry.component';
import { PurchaseOrderEntryComponent } from './components/purchase-order/purchase-order-entry/purchase-order-entry.component';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { SaleOrderComponent } from './components/sale-order/sale-order.component';
import { SaleOrderEntryComponent } from './components/sale-order/sale-order-entry/sale-order-entry.component';
import { StockOutComponent } from './components/stock-out/stock-out.component';
import { StockOutEntryComponent } from './components/stock-out/stock-out-entry/stock-out-entry.component';
import { StockMoveComponent } from './components/stock-move/stock-move.component';
import { StockMoveEntryComponent } from './components/stock-move/stock-move-entry/stock-move-entry.component';
import { StockReturnComponent } from './components/stock-return/stock-return.component';
import { StockReturnEntryComponent } from './components/stock-return/stock-return-entry/stock-return-entry.component';
import { CreditNoteComponent } from './components/credit-note/credit-note.component';
import { CreditNoteEntryComponent } from './components/credit-note/credit-note-entry/credit-note-entry.component';

import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { RefreshAttendanceComponent } from './components/general-operations/refresh-attendance/refresh-attendance.component';
import { HrReportComponent } from './reports/hr-report/hr-report.component';
import { ReportPageComponent, SafePipe } from './reports/report-page/report-page.component';
import { PayrollProgressBarComponent } from './components/payroll/payroll-progress-bar/payroll-progress-bar.component';
import { InvReportComponent } from './reports/inv-report/inv-report.component';
import { MaterialModule } from './material.module';
import { FilterByComponent } from './components/general-operations/filter-by/filter-by.component';
import { CheckLockComponent } from './components/general-operations/tenure-options/check-lock.component';


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
    SafePipe,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    StatisticsComponent,
    PagesComponent, 
    MediaComponent,
    SettingsComponent,
    SublevelMenuComponent,
    EmployeeprofileComponent,
    AttendanceComponent,
    EmpEntryComponent,
    TitleCaseDirective,
    OnlyNumber,
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
    AddRoleComponent,
    PublicHolidayComponent,
    PublicHolidayEntryComponent,
    CompanyWeekendComponent,
    DayWorkingHoursComponent,
    DayWorkingHoursEntryComponent,
    AgreementComponent,
    AgreementEntryComponent,
    InventoryComponent,
    InventoryEntryComponent,
    EmpInventoryComponent,
    EmpInventoryEntryComponent,
    LeaveComponent,
    LeaveEntryComponent,
    ChangeRoleComponent,
    EmployeeLeaveComponent,
    EmployeeLeaveEntryComponent,
    LeaveBalanceComponent,
    LeaveBalanceEntryComponent,
    AllowanceComponent,
    AllowanceEntryComponent,
    OtherEraningComponent,
    OtherEraningEntryComponent,
    OtherDeductionComponent,
    OtherDeductionEntryComponent,
    PayrollComponent,
    IncidentComponent,
    IncidentEntryComponent,
    FinalSettlementComponent,
    FinalSettlementEntryComponent,
    ChartOfAccountsComponent,
    ChartOfAccountsEntryComponent,
    JournalEntryComponent,
    JournalEntryEntryComponent,
    TransactionComponent,
    TransactionEntryComponent,
    CostCenterGroupComponent,
    CostCenterGroupEntryComponent,
    BankComponent,
    BankEntryComponent,
    CostCenterComponent,
    CostCenterEntryComponent,
    CostCenterAccountComponent,
    CostCenterAccountEntryComponent,
    AttendanceSummaryComponent,
    AttendanceSummaryEntryComponent,
    MainHomeComponent,
    SupplierComponent,
    SupplierEntryComponent,
    WarehouseComponent,
    WarehouseEntryComponent,
    ProductComponent,
    ProductEntryComponent,
    CustomerComponent,
    CustomerEntryComponent,
    PurchaseOrderComponent,
    PurchaseOrderEntryComponent,
    SaleOrderComponent,
    SaleOrderEntryComponent,
    StockOutComponent,
    StockOutEntryComponent,
    StockMoveComponent,
    StockMoveEntryComponent,
    StockReturnComponent, 
    StockReturnEntryComponent,
    CreditNoteComponent,
    CreditNoteEntryComponent,
    RefreshAttendanceComponent,
    HrReportComponent,
    ReportPageComponent,
    PayrollProgressBarComponent,
    InvReportComponent,
    FilterByComponent,
    CheckLockComponent,
    // ReportPageComponent
    // ChangePasswordGeneralComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'This item is actually loading...',
     theme:{ 
      extendsFromRoot: true,
      'border-radius': '5px',
      height: '30px',
      width: '100px',
      margin: '5px 0 0',
      duration: 2000,
    }
  }),
    FormsModule,
    MaterialModule,
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
    provideHotToastConfig(),
    provideMomentDateAdapter(undefined, {useUtc:true}),
       {provide: MAT_DATE_LOCALE, useValue: 'it-IT'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
