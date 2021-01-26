import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { environment }from 'src/environments/environment';

@Injectable()
export class CountryService {
    constructor(private http: HttpClient) {
    }

    list() {
        return this.http.get<any>(environment.apiUrl + '/cms/country-list').pipe(map((response: any) => response));
    }

    regions() {
        return this.http.get<any>(environment.apiUrl + '/cms/region-list').pipe(map((response: any) => response));
    }
}