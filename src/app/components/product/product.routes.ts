import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'product',
    pathMatch: 'full',

  },
  {
    path: 'product',
    component: ProductListComponent
  },
  {
    path: 'product/:id',
    component: ProductEditComponent
  }
]
