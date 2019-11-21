import { Demo } from './demo';
import { DemoFilter } from './demo-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class DemoService {
    
    constructor(private http: HttpClient) {
    }

    demoList: Demo[] = [];
  
    findById(id: string): Observable<Demo> {
        let url = 'http://34.245.129.208:3001/api/vod'; 
        let params = { "id": id };
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');
        return this.http.get<Demo>(url, {params, headers});
    }
    
    load(filter: DemoFilter): void {
        this.find(filter).subscribe(
            result => {
                this.demoList = result;
            },
            err => {
                console.error('error loading', err);
            }
        )
    }

    find(filter: DemoFilter): Observable<Demo[]> {
        let url = 'http://34.245.129.208:3001/api/vod';
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        let params = {
            "name": filter.name,
        };

        return this.http.get<Demo[]>(url, {params, headers});
    }

    save(entity: Demo): Observable<Demo> {
        let url = 'http://34.245.129.208:3001/api/vod';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<Demo>(url, entity, {headers});
    }
}

