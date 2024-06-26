import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withHashLocation } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
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
import { EmployeeLeaveComponent } from './components/employee-leave/employee-leave.component';
import { EmployeeLeaveEntryComponent } from './components/employee-leave/employee-leave-entry/employee-leave-entry.component';
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
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionEntryComponent } from './components/transaction/transaction-entry/transaction-entry.component';
import { BankComponent } from './components/bank/bank.component';
import { BankEntryComponent } from './components/bank/bank-entry/bank-entry.component';
import { CostCenterGroupComponent } from './components/cost-center-group/cost-center-group.component';
import { CostCenterGroupEntryComponent } from './components/cost-center-group/cost-center-group-entry/cost-center-group-entry.component';
import { CostCenterComponent } from './components/cost-center/cost-center.component';
import { CostCenterEntryComponent } from './components/cost-center/cost-center-entry/cost-center-entry.component';
import { CostCenterAccountComponent } from './components/cost-center-account/cost-center-account.component';
import { CostCenterAccountEntryComponent } from './components/cost-center-account/cost-center-account-entry/cost-center-account-entry.component';
import { AttendanceSummaryComponent } from './components/attendance-summary/attendance-summary.component';
import { AttendanceSummaryEntryComponent } from './components/attendance-summary/attendance-summary-entry/attendance-summary-entry.component';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { SupplierEntryComponent } from './components/supplier/supplier-entry/supplier-entry.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { WarehouseEntryComponent } from './components/warehouse/warehouse-entry/warehouse-entry.component';
import { ProductComponent } from './components/product/product.component';
import { ProductEntryComponent } from './components/product/product-entry/product-entry.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerEntryComponent } from './components/customer/customer-entry/customer-entry.component';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { PurchaseOrderEntryComponent } from './components/purchase-order/purchase-order-entry/purchase-order-entry.component';
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
import { HrReportComponent } from './reports/hr-report/hr-report.component';
import { ReportPageComponent } from './reports/report-page/report-page.component';
import { InvReportComponent } from './reports/inv-report/inv-report.component';
import { EmpTermEndComponent } from './components/emp-term-end/emp-term-end.component';

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
     // HRD screens
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: MainHomeComponent},
    {path: 'employeeprofile', component: EmployeeprofileComponent},
  {path: 'employeeprofile-entry/:id', component: EmpEntryComponent},
  {path: 'employeeattendance', component: AttendanceComponent},
  {path: 'attendance-summary', component: AttendanceSummaryComponent},
  {path: 'attendance-summary-entry/:id', component: AttendanceSummaryEntryComponent},
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
  {path: 'other-earning', component: OtherEraningComponent},
  {path: 'other-earning-entry/:id', component: OtherEraningEntryComponent},
  {path: 'other-deduction', component: OtherDeductionComponent},
  {path: 'other-deduction-entry/:id', component: OtherDeductionEntryComponent},
  {path: 'payroll', component: PayrollComponent},
  {path: 'allowance', component: AllowanceComponent},
  {path: 'allowance-entry/:id', component: AllowanceEntryComponent},
  {path: 'incident', component: IncidentComponent},
  {path: 'incident-entry/:id', component: IncidentEntryComponent},
  {path: 'final-settlement', component: FinalSettlementComponent},
  {path: 'final-settlement-entry/:id', component: FinalSettlementEntryComponent},
  {path: 'employee-leave', component: EmployeeLeaveComponent},
  {path: 'employee-leave-entry/:id', component: EmployeeLeaveEntryComponent},
  {path: 'leave-application', component: LeaveBalanceComponent},
  {path: 'leave-application-entry/:id', component: LeaveBalanceEntryComponent},
  {path: 'companyweekend', component: CompanyWeekendComponent},
  {path: 'employee-term-end', component: EmpTermEndComponent},
  // Finance screens
  {path: 'chart-of-accounts', component: ChartOfAccountsComponent},
  {path: 'chart-of-accounts-entry/:id', component: ChartOfAccountsEntryComponent},
  {path: 'journal', component: JournalEntryComponent},
  {path: 'journal-entry/:id', component: JournalEntryEntryComponent},
  {path: 'transaction', component: TransactionComponent},
  {path: 'transaction-entry/:id', component: TransactionEntryComponent},
  {path: 'bank', component: BankComponent},
  {path: 'bank-entry/:id', component: BankEntryComponent},
  {path: 'cost-center-group', component: CostCenterGroupComponent},
  {path: 'cost-center-group-entry/:id', component: CostCenterGroupEntryComponent},
  {path: 'cost-center', component: CostCenterComponent},
  {path: 'cost-center-entry/:id', component: CostCenterEntryComponent},
  {path: 'cost-center-account', component: CostCenterAccountComponent},
  {path: 'cost-center-account-entry/:id', component: CostCenterAccountEntryComponent},
  // User management screens
  {path: 'users', component: UsersComponent},
  {path: 'users-entry/:id', component: UsersEntryComponent},
  {path: 'user-roles/:id', component: UsersRolesComponent},
  // Inventory screens
  {path: 'supplier', component: SupplierComponent},
  {path: 'supplier-entry/:id', component: SupplierEntryComponent},
  {path: 'warehouse', component: WarehouseComponent},
  {path: 'warehouse-entry/:id', component: WarehouseEntryComponent},
  {path: 'product', component: ProductComponent},
  {path: 'product-entry/:id', component: ProductEntryComponent},
  {path: 'customer', component: CustomerComponent},
  {path: 'customer-entry/:id', component: CustomerEntryComponent},
  {path: 'purchase-order', component: PurchaseOrderComponent},
  {path: 'purchase-order-entry/:id', component: PurchaseOrderEntryComponent},
  {path: 'sale-order', component: SaleOrderComponent},
  {path: 'sale-order-entry/:id', component: SaleOrderEntryComponent},
  {path: 'stock-out', component: StockOutComponent},
  {path: 'stock-out-entry/:id', component: StockOutEntryComponent},
  {path: 'stock-move', component: StockMoveComponent},
  {path: 'stock-move-entry/:id', component: StockMoveEntryComponent},
  {path: 'stock-return', component: StockReturnComponent},
  {path: 'stock-return-entry/:id', component: StockReturnEntryComponent},
  {path: 'credit-note', component: CreditNoteComponent},
  {path: 'credit-note-entry/:id', component: CreditNoteEntryComponent},

  //Reports
  { path: "report-page", component: ReportPageComponent },
  {path: 'hr-report', component: HrReportComponent},
  {path: 'inv-report', component: InvReportComponent},

  ]},
  // {path: 'products', component: ProductsComponent},
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
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withHashLocation())
  ]
})
export class AppRoutingModule { }
