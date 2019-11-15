import { Categories } from '../models/categories';
import { CategoriesFilter } from '../components/homepage/categories/categories-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiDetails } from '../../environments/environment'

@Injectable()
export class CategoriesService {
    constructor(private http: HttpClient) {
    }
    categoriesList: Categories[] = [];
    findById(id: string): Observable<Categories> {
        let url = apiDetails.baseURL + 'categories';
        let params = { "id": id };
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.get<Categories>(url, { params, headers });
    }
    load(filter: CategoriesFilter): void {
        this.find().subscribe((result: any) => {
            this.categoriesList = result.data;
            console.log(this.categoriesList);
        }, err => {
            console.error('error loading', err);
        });
    }
    find(): Observable<Categories[]> {
        let url = 'http://34.245.129.208:3000/cms/category-list';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        let params = {
            "categoryName": filter.categoryName,
        };
        return this.http.get<Categories[]>(url, { params, headers });
    }
    save(entity: Categories): Observable<Categories> {
        let url = 'http://34.245.129.208:3000/api/categories';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<Categories>(url, entity, { headers });
    }
}
