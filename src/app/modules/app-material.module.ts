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
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatRadioModule,
  MatBadgeModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
} from '@angular/material';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatSlideToggleModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatChipsModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatOptionModule,
  MatSelectModule,
  MatRadioModule,
  MatBadgeModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
  
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule { }
