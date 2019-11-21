import { Banner } from './banner';
import { BannerFilter } from './banner-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from 'src/environments/environment';

@Injectable()
export class BannerService {

    constructor(private http: HttpClient) {
    }

    bannerList: Banner[] = [];

    findById(id: string): Observable<Banner> {
        let url = API.BASE_URL + `/cms/banner/${id}`;

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
        let url = API.BASE_URL + '/cms/banner-list';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');

        return this.http.get<Banner[]>(url, { headers });
    }

    delete(id: string) {
        let url = API.BASE_URL + `/cms/banner/${id}/`;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.delete<any>(url, { headers });
    }

    update(data: Banner) {
        let url = API.BASE_URL + `/banner/${data._id}/update`;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.put<any>(url, data, { headers });
    }

    save(entity: Banner): Observable<Banner> {
        let url = API.BASE_URL + '/cms/banner/create';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<Banner>(url, entity, { headers });
    }
}

