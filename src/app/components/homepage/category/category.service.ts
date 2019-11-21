import { Category } from './category';
import { CategoryFilter } from './category-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class CategoryService {
    
    constructor(private http: HttpClient) {
    }

    categoryList: Category[] = [];
  
    findById(id: string): Observable<Category> {
        let url = 'http://34.245.129.208:3001/api/categories'; 
        let params = { "id": id };
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');
        return this.http.get<Category>(url, {params, headers});
    }
    
    load(filter: CategoryFilter): void {
        this.find(filter).subscribe(
            result => {
                this.categoryList = result;
            },
            err => {
                console.error('error loading', err);
            }
        )
    }

    find(filter: CategoryFilter): Observable<Category[]> {
        let url = 'http://34.245.129.208:3001/api/categories';
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        let params = {
            "categoryName": filter.categoryName,
        };

        return this.http.get<Category[]>(url, {params, headers});
    }

    save(entity: Category): Observable<Category> {
        let url = 'http://34.245.129.208:3001/api/categories';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<Category>(url, entity, {headers});
    }
}

