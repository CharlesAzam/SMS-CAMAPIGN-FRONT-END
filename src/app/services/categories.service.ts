// import { CategoriesFilter } from "../components/homepage/categories/categories-filter";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Categories } from "../models/categories";
import { environment }from "src/environments/environment";

@Injectable()
export class CategoriesService {
  constructor(private http: HttpClient) {}
  categoriesList: Categories[] = [];
  findById(id: string): Observable<Categories> {
    let url = environment.apiUrl + "/cms/category/" + id;
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
  findByType(type: string): Observable<Categories> {
    let url = environment.apiUrl + "/cms/categorybytype/" + type;
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<Categories>(url, { headers });
  }
  find(pageNumber?, size?, language?, filter?): Observable<Categories[]> {
    let url = environment.apiUrl + "/cms/category-list";
    let headers = new HttpHeaders().set("Accept", "application/json");
    let params: any = {};

    if (pageNumber) {
      params.pageNumber = pageNumber;
    }

    if (language) {
      params.language = language;
    }

    if (size) {
      params.size = size;
    }
    if (filter) {
      params.filter = filter;
    }

    if (params) {
      return this.http.get<Categories[]>(url, { params, headers });
    }
    return this.http.get<Categories[]>(url, { headers });
  }
  save(entity: Categories): Observable<Categories> {
    let url = environment.apiUrl + "/cms/category/create";
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.post<Categories>(url, entity, { headers });
  }

  update(entity: Categories): Observable<Categories> {
    let url = environment.apiUrl + `/cms/category/${entity._id}/update`;
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.put<Categories>(url, entity, { headers });
  }

  delete(id: string): Observable<Categories> {
    let url = environment.apiUrl + `/cms/category/${id}/`;
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.delete<Categories>(url, { headers });
  }

  getCount(language?) {
    console.log("language", language);
    let url =
      environment.apiUrl +
      `/cms/count/category${language ? "?language=" + language : ""}`;
    return this.http.get(url);
  }
  uploadUrl(fileToUpload: File): Observable<Object> {
    let headers = new HttpHeaders();
    const endpoint = environment.apiUrl + "/cms/upload-file";
    const formData: FormData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData, { headers });
  }
}
