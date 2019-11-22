
import { Package } from './package';
import { PackageFilter } from './package-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from 'src/environments/environment';

const API_URL = 'http://localhost:3000/cms'
@Injectable()
export class PackageService {

    constructor(private http: HttpClient) {
    }

    packageList: Package[] = [];

    // Azam packages list 
    findAzamPackageMappingList() {
        let url = API_URL + '/azam-plans';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.get<any>(url, { headers })
    }


    findById(id: string): Observable<Package> {
        let url = API.BASE_URL + '/api/vod';
        let params = { "id": id };
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.get<Package>(url, { params, headers });
    }

    load(filter: PackageFilter): void {
        this.find(filter).subscribe(
            result => {
                this.packageList = result;
            },
            err => {
                console.error('error loading', err);
            }
        )
    }

    find(filter?: PackageFilter): Observable<Package[]> {
        let url = API.BASE_URL + '/cms/package-list';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');

        return this.http.get<Package[]>(url, { headers });
    }

    save(entity: Package): Observable<Package> {
        let url = API.BASE_URL + '/api/vod';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<Package>(url, entity, { headers });
    }
}

