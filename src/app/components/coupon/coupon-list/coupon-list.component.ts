import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CouponFilter } from '../coupon-filter';
import { CouponService } from '../coupon.service';
import { Coupon } from '../coupon';

@Component({
    selector: 'coupon',
    templateUrl: 'coupon-list.component.html'
})
export class CouponListComponent {

    filter = new CouponFilter();
    selectedCoupon: Coupon;

    get couponList(): Coupon[] {
        return this.couponService.couponList;
    }

    constructor(private couponService: CouponService) {
    }

    ngOnInit() {
    }

    search(): void {
        this.couponService.load(this.filter);
    }

    select(selected: Coupon): void {
        this.selectedCoupon = selected;
    }

}
