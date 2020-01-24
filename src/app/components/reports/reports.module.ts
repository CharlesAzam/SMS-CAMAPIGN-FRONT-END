import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/modules/app-material.module';
import { ReportService } from './reports.service';
import { REPORT_ROUTES } from './reports.routes';
import { UserReportComponet } from './user-reports/user-report.component';
import { TransactionReportComponent } from './transaction-reports/transaction-report.component';
import { CollectionReportComponent } from './collection-reports/collection-report.component';
import { RequestsComponent } from './requests/requests.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(REPORT_ROUTES),
  ],
  declarations: [
    UserReportComponet,
    TransactionReportComponent,
    CollectionReportComponent,
    RequestsComponent
  ],
  providers: [
    ReportService
  ],
  entryComponents: [
  
  ],
  exports: [
  ]
})
export class ReportsModule { }
