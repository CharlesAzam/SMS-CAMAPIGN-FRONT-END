import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/modules/app-material.module';
import { UserInformationComponent } from './user-information/user-informationcomponent';
import { LoggedSupportComponent } from './logged-support/logged-support.component';
import { SupportService } from './support.service';
import { SUPPORT_ROUTES } from './support.routes';
import { DetailedInformationComponent } from './detailed-information/detailed-information.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(SUPPORT_ROUTES),
  ],
  declarations: [
    UserInformationComponent,
    LoggedSupportComponent,
    DetailedInformationComponent],
  providers: [
    SupportService
  ],
  entryComponents: [

  ],
  exports: [
  ]
})
export class SupportModule { }
