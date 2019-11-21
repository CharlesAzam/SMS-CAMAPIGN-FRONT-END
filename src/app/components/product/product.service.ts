import { Product } from './product';
import { ProductFilter } from './product-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from 'src/environments/environment';

@Injectable()
export class ProductService {
    
    constructor(private http: HttpClient) {
    }

    productList: Product[] = [];
  
    findById(id: string): Observable<Product> {
        let url = API.BASE_URL+'/api/vod'; 
        let params = { "id": id };
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');
        return this.http.get<Product>(url, {params, headers});
    }
    
    load(filter: ProductFilter): void {
        this.find(filter).subscribe(
            result => {
                this.productList = result;
            },
            err => {
                console.error('error loading', err);
            }
        )
    }

    find(filter: ProductFilter): Observable<Product[]> {
        let url = API.BASE_URL+'/api/vod';
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        let params = {
            "title": filter.title,
        };

        return this.http.get<Product[]>(url, {params, headers});
    }

    save(entity: Product): Observable<Product> {
        let url = API.BASE_URL+'/api/vod';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<Product>(url, entity, {headers});
    }
}

