
import { Package } from './package';
import { PackageFilter } from './package-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppleProduct } from './apple-product';

@Injectable()
export class PackageService {

    constructor(private http: HttpClient) {
    }

    packageList: Package[] = [];

    // Azam packages list 
    findAzamPackageMappingList() {
        let url = environment.apiUrl + '/cms/azam-plans';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.get<any>(url, { headers })
    }


    findCountryCodes() {
        let url = environment.apiUrl + '/api/country-currency-codes'
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.get<any>(url, { headers })
    }


    findContent() {
        let url = environment.apiUrl + '/cms/content/vod'
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.get<any>(url, { headers })
    }

    findPackageList(pageNumber?, size?, filter?) {
        let url = environment.apiUrl + '/cms/package-list'
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');

        if (pageNumber || size) {
            let params = {
                "pageNumber": pageNumber,
                "size": size
            };

            if (filter) {
                params['filter'] = filter;
            }

            return this.http.get<any>(url, { params, headers })
        }
        return this.http.get<any>(url, { headers })
    }


    findById(id: string): Observable<Package> {
        let url = environment.apiUrl + '/cms/package/' + id;
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
        let url = environment.apiUrl + '/cms/package-list';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');

        return this.http.get<Package[]>(url, { headers });
    }

    save(entity: Package): Observable<Package> {
        let url = environment.apiUrl + '/cms/package/create';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<Package>(url, entity, { headers });
    }

    getCount() {
        let url = environment.apiUrl + `/cms/count/package`;
        return this.http.get(url);
    }

    delete(packageDef: any) {
        let url = environment.apiUrl + `/cms/package/${packageDef._id}/delete`;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.put<any>(url, {}, { headers });
    }

    update(packageDef: any) {
        let url = environment.apiUrl + `/cms/package/${packageDef._id}/update`;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.put<Package>(url, packageDef, { headers });
    }

    // Get Apple products
    appleProductList() {
        let url = environment.apiUrl + `/cms/apple/products`;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.get<AppleProduct[]>(url, { headers });
    }
}

