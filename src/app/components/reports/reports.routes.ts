import { Routes } from '@angular/router';
import { UserReportComponet } from './user-reports/user-report.component';
import { TransactionReportComponent } from './transaction-reports/transaction-report.component';
import { CollectionReportComponent } from './collection-reports/collection-report.component';
import { RequestsComponent } from './requests/requests.component';
import { SubscriptionReportComponent } from './subscription-reports/subscription-report.component';
import { InvoiceReportComponent } from './invoice-reports/invoice-report.component';
import { RevenueReportComponent } from './revenue-recognition/revenue-recognition-report.component';
import { VendorReportConfigComponent } from './vendor-reports/vendor-reports.component';
import { DetailedCollectionReportComponent } from './detailed-collection-reports/collection-report.component';
import { PackageWiseRevenueReport } from './package-revenue-recognition/revenue-recognition-report.component';
import { SubscriberCountReportsComponent } from './subscriber-count-reports/subscriber-count-reports.component';

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
    path: 'collections/summary',
    component: CollectionReportComponent
  },
  {
    path: 'collections/detailed',
    component: DetailedCollectionReportComponent
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
  },
  {
    path: 'revenue',
    component: RevenueReportComponent
  },
  {
    path: 'revenue-packagewise',
    component: PackageWiseRevenueReport
  },
  {
    path: 'vendors',
    component: VendorReportConfigComponent
  },
  {
    path: 'subscriptions-count',
    component: SubscriberCountReportsComponent
  },
]
