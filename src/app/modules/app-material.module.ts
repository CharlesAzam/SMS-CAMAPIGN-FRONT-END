import { NgModule } from '@angular/core';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
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
  MatSortModule,
  MatTooltipModule,
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
  MatExpansionModule,
  SatDatepickerModule, 
  SatNativeDateModule,
  MatTooltipModule,
];



@NgModule({
  imports: [modules,NgMultiSelectDropDownModule.forRoot()],
  exports: [modules]
})
export class MaterialModule { }
