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
  MatIconModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule { }
