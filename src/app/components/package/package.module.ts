import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PackageListComponent } from './package-list/package-list.component';
import { PackageEditComponent } from './package-edit/package-edit.component';
import { PackageService } from './package.service';
import { PACKAGE_ROUTES } from './package.routes';
import { MaterialModule } from 'src/app/modules/app-material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(PACKAGE_ROUTES)
  ],
  declarations: [
    PackageListComponent,
    PackageEditComponent
  ],
  providers: [
    PackageService
  ],
  exports: [
  ]
})
export class PackageModule { }
