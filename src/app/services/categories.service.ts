import { CategoriesFilter } from '../components/homepage/categories/categories-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoryFilter } from '../components/homepage/category/category-filter';
import { Categories } from '../models/categories';

@Injectable()
export class CategoriesService {
    constructor(private http: HttpClient) {
    }
    categoriesList: Categories[] = [];
    findById(id: string): Observable<Categories> {
        let url = 'http://34.245.129.208:3001/cms/category/' + id;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.get<Categories>(url, { headers });
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
        let url = 'http://34.245.129.208:3001/cms/category-list';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        let params = {
            "categoryName": CategoryFilter.name,
        };
        return this.http.get<Categories[]>(url, { params, headers });
    }
    save(entity: Categories): Observable<Categories> {
        let url = 'http://34.245.129.208:3001/cms/category/create';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<Categories>(url, entity, { headers });
    }

    update(entity: Categories): Observable<Categories> {
        let url = `http://34.245.129.208:3001/cms/category/${entity._id}/update`;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.put<Categories>(url, entity, { headers });
    }

    delete(id: string): Observable<Categories> {
        let url = `http://34.245.129.208:3001/cms/category/${id}/`;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.delete<Categories>(url, { headers });
    }
}
