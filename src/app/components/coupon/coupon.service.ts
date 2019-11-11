import { Coupon } from './coupon';
import { CouponFilter } from './coupon-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class CouponService {
    
    constructor(private http: HttpClient) {
    }

    couponList: Coupon[] = [];
  
    findById(id: string): Observable<Coupon> {
        let url = 'http://34.245.129.208:3000/api/vod'; 
        let params = { "id": id };
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');
        return this.http.get<Coupon>(url, {params, headers});
    }
    
    load(filter: CouponFilter): void {
        this.find(filter).subscribe(
            result => {
                this.couponList = result;
            },
            err => {
                console.error('error loading', err);
            }
        )
    }

    find(filter: CouponFilter): Observable<Coupon[]> {
        let url = 'http://34.245.129.208:3000/api/vod';
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        let params = {
        };

        return this.http.get<Coupon[]>(url, {params, headers});
    }

    save(entity: Coupon): Observable<Coupon> {
        let url = 'http://34.245.129.208:3000/api/vod';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<Coupon>(url, entity, {headers});
    }
}

