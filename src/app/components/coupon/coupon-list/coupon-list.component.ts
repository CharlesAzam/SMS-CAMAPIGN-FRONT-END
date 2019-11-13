import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CouponFilter } from '../coupon-filter';
import { CouponService } from '../coupon.service';
import { Coupon } from '../coupon';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'coupon',
    templateUrl: 'coupon-list.component.html'
})
export class CouponListComponent {

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    filter = new CouponFilter();
    selectedCoupon: Coupon;

    dataSource = new MatTableDataSource<Coupon>(this.couponList);

    displayedColumns: string[] = ['id', 'code', 'startDate', 'endDate', 'percentage', 'status', 'action']


    get couponList(): Coupon[] {
        // return this.couponService.couponList;
        return [
            { id: '1', code: '20200', startDate: '12/12/2020', endDate: '12/12/2030', percentage: '10%', status: true },
            { id: '1', code: '20200', startDate: '12/12/2020', endDate: '12/12/2030', percentage: '10%', status: true },
            { id: '1', code: '20200', startDate: '12/12/2020', endDate: '12/12/2030', percentage: '10%', status: true },
            { id: '1', code: '20200', startDate: '12/12/2020', endDate: '12/12/2030', percentage: '10%', status: true },
            { id: '1', code: '20200', startDate: '12/12/2020', endDate: '12/12/2030', percentage: '10%', status: true },

        ]
    }

    constructor(private couponService: CouponService) {
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    search(): void {
        this.couponService.load(this.filter);
    }

    select(selected: Coupon): void {
        this.selectedCoupon = selected;
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


}
