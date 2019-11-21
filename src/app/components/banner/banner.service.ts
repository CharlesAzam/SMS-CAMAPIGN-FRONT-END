import { Banner } from './banner';
import { BannerFilter } from './banner-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class BannerService {

    constructor(private http: HttpClient) {
    }

    bannerList: Banner[] = [];

    findById(id: string): Observable<Banner> {
        let url = `http://34.245.129.208:3001/cms/banner/${id}`;

        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.get<Banner>(url, { headers });
    }

    load(filter: BannerFilter): void {
        this.find().subscribe(
            result => {
                this.bannerList = result;
            },
            err => {
                console.error('error loading', err);
            }
        )
    }

    find(): Observable<Banner[]> {
        let url = 'http://34.245.129.208:3001/cms/banner-list';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');

        return this.http.get<Banner[]>(url, { headers });
    }

    delete(id: string) {
        let url = `http://34.245.129.208:3001/cms/banner/${id}/`;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.delete<any>(url, { headers });
    }

    update(data: Banner) {
        let url = `http://34.245.129.208:3001/cms/banner/${data._id}/update`;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.put<any>(url, data, { headers });
    }

    save(entity: Banner): Observable<Banner> {
        let url = 'http://34.245.129.208:3001/cms/banner/create';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<Banner>(url, entity, { headers });
    }
}

