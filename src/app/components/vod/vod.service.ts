import { Vod } from './vod';
import { VodFilter } from './vod-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class VodService {

    constructor(private http: HttpClient) {
    }

    vodList: Vod[] = [];

    findById(id: string): Observable<Vod> {
        let url = 'http://34.245.129.208:3000/api/vod';
        let params = { "id": id };
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.get<Vod>(url, { params, headers });
    }

    load(filter: VodFilter, route: String): void {
        this.find(route, filter).subscribe(
            result => {
                this.vodList = result;
            },
            err => {
                console.error('error loading', err);
            }
        )
    }

    find(route: String, filter: VodFilter): Observable<Vod[]> {
        console.log(route)
        let url = 'http://34.245.129.208:3000/cms/content/' + route;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');

        return this.http.get<Vod[]>(url, { headers });
    }

    save(entity: Vod): Observable<Vod> {
        let url = 'http://34.245.129.208:3000/api/vod';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<Vod>(url, entity, { headers });
    }
}

