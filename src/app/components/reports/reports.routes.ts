import { Routes } from '@angular/router';
import { UserReportComponet } from './user-reports/user-report.component';
import { TransactionReportComponent } from './transaction-reports/transaction-report.component';
import { CollectionReportComponent } from './collection-reports/collection-report.component';
import { RequestsComponent } from './requests/requests.component';
import { SubscriptionReportComponent } from './subscription-reports/subscription-report.component';
import { InvoiceReportComponent } from './invoice-reports/invoice-report.component';

export const REPORT_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users'
  },
  {
    path: 'users',
    component: UserReportComponet
  },
  {
    path: 'transactions',
    component: TransactionReportComponent
  },
  {
    path: 'collections/:type',
    component: CollectionReportComponent
  },
  {
    path: 'requests',
    component: RequestsComponent
  },
  {
    path: 'subscriptions',
    component: SubscriptionReportComponent
  },
  {
    path: 'invoices',
    component: InvoiceReportComponent
  }
]
