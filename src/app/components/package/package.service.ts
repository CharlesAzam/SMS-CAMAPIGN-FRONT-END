
import { Package } from './package';
import { PackageFilter } from './package-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from 'src/environments/environment';

@Injectable()
export class PackageService {

    constructor(private http: HttpClient) {
    }

    packageList: Package[] = [];

    // Azam packages list 
    findAzamPackageMappingList() {
        let url = API.BASE_URL + '/cms/azam-plans';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.get<any>(url, { headers })
    }


    findCountryCodes() {
        let url = API.BASE_URL + '/api/country-currency-codes'
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.get<any>(url, { headers })
    }


    findContent() {
        let url = API.BASE_URL + '/cms/content/vod'
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.get<any>(url, { headers })
    }

    findPackageList(pageNumber?, size?) {
        let url = API.BASE_URL + '/cms/package-list'
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');

        if (pageNumber !== null || size !== null) {
            let params = {
                "pageNumber": pageNumber,
                "size": size
            };
            return this.http.get<any>(url, { params, headers })
        }
        return this.http.get<any>(url, { headers })
    }


    findById(id: string): Observable<Package> {
        let url = API.BASE_URL + '/cms/package/' + id;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.get<Package>(url, { headers });
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
        let url = API.BASE_URL + '/cms/package/create';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<Package>(url, entity, { headers });
    }

    getCount() {
        let url = API.BASE_URL + `/cms/count/package`;
        return this.http.get(url);
    }

    delete(packageDef: any) {
        let url = API.BASE_URL + `/cms/package/${packageDef._id}/delete`;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.put<any>(url, {}, { headers });
    }

    update(packageDef: any) {
        let url = API.BASE_URL + `/cms/package/${packageDef._id}/update`;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.put<Package>(url, packageDef, { headers });
    }
}

