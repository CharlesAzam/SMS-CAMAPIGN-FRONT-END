import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SubCategory } from '../models/sub.categories';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {
  url = "http://localhost:3000/cms/";

  constructor(private http: HttpClient) { }

  find() {
    let url = 'http://34.245.129.208:3000/cms/sub-category-list';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<any>(url, { headers })

  }
  findById(id: string) {
    let url = 'http://34.245.129.208:3000/cms/sub-category/'+id;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<any>(url, { headers });
  }

  save(data: SubCategory) {
    let url = 'http://34.245.129.208:3000/cms/sub-category/create';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<any>(url, data, { headers });
  }

  update(data: SubCategory) {
    let url = `http://34.245.129.208:3000/cms/sub-category/${data._id}/update`;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.put<any>(url, data, { headers });
  }

  delete(id: string) {
    let url = `http://34.245.129.208:3000/cms/sub-category/${id}/`;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.delete<any>(url, { headers });
  }

  // load(filter: CategoriesFilter): void {
  //     this.find().subscribe((result: any) => {
  //         this.categoriesList = result.data;
  //         console.log(this.categoriesList);
  //     }, err => {
  //         console.error('error loading', err);
  //     });
  // }
}
