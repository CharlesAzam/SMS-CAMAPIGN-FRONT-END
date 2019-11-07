import { Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

export const CATEGORY_ROUTES: Routes = [
  {
    path: 'category',
    component: CategoryListComponent
  },
  {
    path: 'category/:id',
    component: CategoryEditComponent
  }
]
