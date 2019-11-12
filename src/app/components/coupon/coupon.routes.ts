import { Routes } from '@angular/router';
import { CouponListComponent } from './coupon-list/coupon-list.component';
import { CouponEditComponent } from './coupon-edit/coupon-edit.component';

export const COUPON_ROUTES: Routes = [
  {
    path: 'coupon',
    component: CouponListComponent
  },
  {
    path: '',
    component: CouponListComponent
  },
  {
    path: 'coupon/:id',
    component: CouponEditComponent
  }
]
