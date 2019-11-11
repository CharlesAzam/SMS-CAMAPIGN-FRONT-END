import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CouponListComponent } from './coupon-list/coupon-list.component';
import { CouponEditComponent } from './coupon-edit/coupon-edit.component';
import { CouponService } from './coupon.service';
import { COUPON_ROUTES } from './coupon.routes';
import { MaterialModule } from 'src/app/modules/app-material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(COUPON_ROUTES)
  ],
  declarations: [
    CouponListComponent,
    CouponEditComponent
  ],
  providers: [
    CouponService
  ],
  exports: [
  ]
})
export class CouponModule { }
