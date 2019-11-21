import { CreateCategories } from './create-categories';
import { CreateCategoriesFilter } from './create-categories-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from 'src/environments/environment';

@Injectable()
export class CreateCategoriesService {
    
    constructor(private http: HttpClient) {
    }

    createCategoriesList: CreateCategories[] = [];
  
    findById(id: string): Observable<CreateCategories> {
        let url = API.BASE_URL+'/api/vod'; 
        let params = { "id": id };
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');
        return this.http.get<CreateCategories>(url, {params, headers});
    }
    
    load(filter: CreateCategoriesFilter): void {
        this.find(filter).subscribe(
            result => {
                this.createCategoriesList = result;
            },
            err => {
                console.error('error loading', err);
            }
        )
    }

    find(filter: CreateCategoriesFilter): Observable<CreateCategories[]> {
        let url = API.BASE_URL+'/api/vod';
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        let params = {
        };

        return this.http.get<CreateCategories[]>(url, {params, headers});
    }

    save(entity: CreateCategories): Observable<CreateCategories> {
        let url = API.BASE_URL+'/api/vod';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<CreateCategories>(url, entity, {headers});
    }
}

