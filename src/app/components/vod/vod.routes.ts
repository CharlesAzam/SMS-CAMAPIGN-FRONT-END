import { Routes } from '@angular/router';
import { VodListComponent } from './vod-list/vod-list.component';
import { VodEditComponent } from './vod-edit/vod-edit.component';

export const VOD_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'vod'
  },
  {
    path: 'vod',
    component: VodListComponent
  },
  {
    path: 'vod/:id',
    component: VodEditComponent
  }
]
