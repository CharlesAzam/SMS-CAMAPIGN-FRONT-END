import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RadioListComponent } from './radio-list/radio-list.component';
import { RadioEditComponent } from './radio-edit/radio-edit.component';
import { RadioService } from './radio.service';
import { RADIO_ROUTES } from './radio.routes';
import { MaterialModule } from 'src/app/modules/app-material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(RADIO_ROUTES)
  ],
  declarations: [
    RadioListComponent,
    RadioEditComponent
  ],
  providers: [
    RadioService
  ],
  exports: [
  ]
})
export class RadioModule { }
