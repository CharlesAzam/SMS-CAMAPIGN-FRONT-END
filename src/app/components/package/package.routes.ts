import { Routes } from '@angular/router';
import { PackageListComponent } from './package-list/package-list.component';
import { PackageEditComponent } from './package-edit/package-edit.component';

export const PACKAGE_ROUTES: Routes = [
  {
    path: '',
    component: PackageListComponent
  },
  {
    path: 'package',
    component: PackageListComponent
  },
  {
    path: 'package/:id',
    component: PackageEditComponent
  }
]
