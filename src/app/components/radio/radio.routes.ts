import { Routes } from '@angular/router';
import { RadioListComponent } from './radio-list/radio-list.component';
import { RadioEditComponent } from './radio-edit/radio-edit.component';

export const RADIO_ROUTES: Routes = [
  {
    path: '',
    component: RadioListComponent
  },
  {
    path: 'radio',
    component: RadioListComponent
  },
  {
    path: 'radio/:id',
    component: RadioEditComponent
  }
]
