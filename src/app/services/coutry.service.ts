import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { API } from 'src/environments/environment';

@Injectable()
export class CountryService {
    constructor(private http: HttpClient) {
    }

    list() {
        return this.http.get<any>(API.BASE_URL + '/cms/country-list').pipe(map((response: any) => response));
    }
}