import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CouponService } from '../coupon.service';
import { Coupon } from '../coupon';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'coupon-edit',
  templateUrl: './coupon-edit.component.html'
})
export class CouponEditComponent implements OnInit {

    id: string;
    coupon: Coupon;
    errors: string;
    picker

    constructor(
        private route: ActivatedRoute,
        private couponService: CouponService) { 
    }

    ngOnInit() {
        this
            .route
            .params
            .pipe(
                map(p => p['id']),
                switchMap(id => {
                    if (id === 'new') return of(new Coupon());
                    return this.couponService.findById(id)
                })
            )
            .subscribe(
                coupon => { 
                    this.coupon = coupon; 
                    this.errors = ''; 
                },
                err => { 
                    this.errors = 'Error loading'; 
                }
            );
    }

    save() {
        this.couponService.save(this.coupon).subscribe(
            coupon => { 
                this.coupon = coupon; 
                this.errors = 'Save was successful!'; 
            },
            err => { 
                this.errors = 'Error saving'; 
            }
        );
    }
}