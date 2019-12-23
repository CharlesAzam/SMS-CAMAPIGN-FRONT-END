import { Routes } from '@angular/router';
import { UserReportComponet } from './user-reports/user-report.component';
import { TransactionReportComponent } from './transaction-reports/transaction-report.component';
import { CollectionReportComponent } from './collection-reports/collection-report.component';

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
    path: 'collections',
    component: CollectionReportComponent
  },
]
