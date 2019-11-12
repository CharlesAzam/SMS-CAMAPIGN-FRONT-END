import { NgModule } from '@angular/core';

import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatOptionModule,
  MatSelectModule,
  MatRadioModule,
} from '@angular/material';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatOptionModule,
  MatSelectModule,
  MatRadioModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
