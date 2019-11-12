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
        let url = 'http://34.245.129.208:3000/api/vod'; 
        let params = { "id": id };
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');
        return this.http.get<Banner>(url, {params, headers});
    }
    
    load(filter: BannerFilter): void {
        this.find(filter).subscribe(
            result => {
                this.bannerList = result;
            },
            err => {
                console.error('error loading', err);
            }
        )
    }

    find(filter: BannerFilter): Observable<Banner[]> {
        let url = 'http://34.245.129.208:3000/api/vod';
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        let params = {
            "name": filter.name,
        };

        return this.http.get<Banner[]>(url, {params, headers});
    }

    save(entity: Banner): Observable<Banner> {
        let url = 'http://34.245.129.208:3000/api/vod';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<Banner>(url, entity, {headers});
    }
}

