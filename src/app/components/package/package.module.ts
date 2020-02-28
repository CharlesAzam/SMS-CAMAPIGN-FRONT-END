import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PackageListComponent } from './package-list/package-list.component';
import { PackageEditComponent, AddPricesDialog } from './package-edit/package-edit.component';
import { PackageService } from './package.service';
import { PACKAGE_ROUTES } from './package.routes';
import { MaterialModule } from 'src/app/modules/app-material.module';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(PACKAGE_ROUTES),
    EditorModule,
    ReactiveFormsModule
  ],
  declarations: [
    PackageListComponent,
    PackageEditComponent,
    AddPricesDialog
  ],
  providers: [
    PackageService
  ],
  exports: [
  ],
  entryComponents:[
    AddPricesDialog
  ]
})
export class PackageModule { }
