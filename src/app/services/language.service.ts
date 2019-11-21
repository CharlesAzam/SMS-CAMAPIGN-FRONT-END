import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class LanguageService {
    constructor(private http: HttpClient) {
    }

    list() {
        return this.http.get<any>('http://34.245.129.208:3000/cms/language-list').pipe(map((response: any) => response));
    }
}