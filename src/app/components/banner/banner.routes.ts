import { Routes } from '@angular/router';
import { BannerListComponent } from './banner-list/banner-list.component';
import { BannerEditComponent } from './banner-edit/banner-edit.component';

export const BANNER_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'banner'
  },
  {
    path: 'banner',
    component: BannerListComponent
  },
  {
    path: 'banner/:id',
    component: BannerEditComponent
  }
]
