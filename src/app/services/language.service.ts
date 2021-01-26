import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { environment }from 'src/environments/environment';

@Injectable()
export class LanguageService {
    constructor(private http: HttpClient) {
    }

    list() {
        return this.http.get<any>(environment.apiUrl+'/cms/language-list').pipe(map((response: any) => response));
    }
}