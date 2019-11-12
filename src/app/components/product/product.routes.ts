import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'product'
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
