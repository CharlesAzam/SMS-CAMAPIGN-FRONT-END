import { CategoriesFilter } from "../components/homepage/categories/categories-filter";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CategoryFilter } from "../components/homepage/category/category-filter";
import { Categories } from "../models/categories";
import { API } from "src/environments/environment";

@Injectable()
export class CategoriesService {
  constructor(private http: HttpClient) {}
  categoriesList: Categories[] = [];
  findById(id: string): Observable<Categories> {
    let url = API.BASE_URL + "/cms/category/" + id;
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<Categories>(url, { headers });
  }
  // load(filter: CategoriesFilter): void {
  //     this.find().subscribe((result: any) => {
  //         this.categoriesList = result.data;
  //         console.log(this.categoriesList);
  //     }, err => {
  //         console.error('error loading', err);
  //     });
  // }
  find(pageNumber?, size?): Observable<Categories[]> {
    let url = API.BASE_URL + "/cms/category-list";
    let headers = new HttpHeaders().set("Accept", "application/json");
    if (pageNumber !== null || size !== null) {
      let params = {
        pageNumber: pageNumber,
        size: size
      };
      return this.http.get<Categories[]>(url, { params, headers });
    }
    return this.http.get<Categories[]>(url, { headers });
  }
  save(entity: Categories): Observable<Categories> {
    let url = API.BASE_URL + "/cms/category/create";
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.post<Categories>(url, entity, { headers });
  }

  update(entity: Categories): Observable<Categories> {
    let url = API.BASE_URL + `/cms/category/${entity._id}/update`;
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.put<Categories>(url, entity, { headers });
  }

  delete(id: string): Observable<Categories> {
    let url = API.BASE_URL + `/cms/category/${id}/`;
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.delete<Categories>(url, { headers });
  }

  getCount() {
    let url = API.BASE_URL + `/cms/count/category`;
    return this.http.get(url);
  }
  uploadUrl(fileToUpload: File): Observable<Object> {
    let headers = new HttpHeaders();
    const endpoint = API.BASE_URL + "/cms/upload-file";
    const formData: FormData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData, { headers });
  }
}
