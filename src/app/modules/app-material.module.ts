import { NgModule } from '@angular/core';

import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatOptionModule,
  MatSelectModule,
  MatChipsModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatChipsModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule

];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule { }
