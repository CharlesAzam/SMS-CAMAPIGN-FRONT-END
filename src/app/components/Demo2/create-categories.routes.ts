import { Routes } from '@angular/router';
import { CreateCategoriesListComponent } from './create-categories-list/create-categories-list.component';
import { CreateCategoriesEditComponent } from './create-categories-edit/create-categories-edit.component';

export const CREATE-CATEGORIES_ROUTES: Routes = [
  {
    path: 'create-categories',
    component: CreateCategoriesListComponent
  },
  {
    path: 'create-categories/:id',
    component: CreateCategoriesEditComponent
  }
]
