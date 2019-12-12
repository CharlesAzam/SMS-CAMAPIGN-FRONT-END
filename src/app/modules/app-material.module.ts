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
  MatDialogModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatCheckboxModule,
} from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatSlideToggleModule,
  MatOptionModule,
  MatProgressSpinnerModule,
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
  MatDialogModule,
  NgxMatSelectSearchModule,
  MatCheckboxModule,
  MatExpansionModule

];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule { }
