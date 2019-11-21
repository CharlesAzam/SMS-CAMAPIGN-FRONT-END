import { Radio } from './radio';
import { RadioFilter } from './radio-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class RadioService {
    
    constructor(private http: HttpClient) {
    }

    radioList: Radio[] = [];
  
    findById(id: string): Observable<Radio> {
        let url = 'http://34.245.129.208:3001/api/vod'; 
        let params = { "id": id };
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');
        return this.http.get<Radio>(url, {params, headers});
    }
    
    load(filter: RadioFilter): void {
        this.find(filter).subscribe(
            result => {
                this.radioList = result;
            },
            err => {
                console.error('error loading', err);
            }
        )
    }

    find(filter: RadioFilter): Observable<Radio[]> {
        let url = 'http://34.245.129.208:3001/api/vod';
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        let params = {
            "name": filter.name,
        };

        return this.http.get<Radio[]>(url, {params, headers});
    }

    save(entity: Radio): Observable<Radio> {
        let url = 'http://34.245.129.208:3001/api/vod';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<Radio>(url, entity, {headers});
    }
}

