
import { Package } from './package';
import { PackageFilter } from './package-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const API_URL = 'http://localhost:3000/cms'
@Injectable()
export class PackageService {
    
    constructor(private http: HttpClient) {
    }

    packageList: Package[] = [];

    // Azam packages list 
    findAzamPackageMappingList() {
        let url = API_URL+'/azam-plans';
        let headers = new HttpHeaders()
          .set('Accept', 'application/json');
        return this.http.get<any>(url, { headers })
      }

  
    findById(id: string): Observable<Package> {
        let url = API_URL; 
        let params = { "id": id };
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');
        return this.http.get<Package>(url, {params, headers});
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

    find(filter: PackageFilter): Observable<Package[]> {
        let url = API_URL;
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        let params = {
            "name": filter.name,
        };

        return this.http.get<Package[]>(url, {params, headers});
    }

    save(entity: Package): Observable<Package> {
        let url = API_URL;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<Package>(url, entity, {headers});
    }
}

