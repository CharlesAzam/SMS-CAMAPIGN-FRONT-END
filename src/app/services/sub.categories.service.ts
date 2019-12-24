import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SubCategory } from "../models/sub.categories";
import { API } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class SubCategoriesService {
  url = "http://localhost:3001/cms/";

  constructor(private http: HttpClient) { }

  find(pageNumber?, size? ,filter?) {
    let url = API.BASE_URL + "/cms/sub-category-list";
    let headers = new HttpHeaders().set("Accept", "application/json");
    if (pageNumber || size) {
      let params = {
        pageNumber: pageNumber,
        size: size,
        filter:filter
      };
      return this.http.get<any>(url, { params, headers });
    }
    return this.http.get<any>(url, { headers });
  }
  findById(id: string) {
    let url = API.BASE_URL + "/cms/sub-category/" + id;
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<any>(url, { headers });
  }
  findByCategory(categoryID) {
    let data = { catID: categoryID };
    let url = API.BASE_URL + "/cms/sub-category/category";
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.post<any>(url, data, { headers });
  }

  save(data: SubCategory) {
    let url = API.BASE_URL + "/cms/sub-category/create";
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.post<any>(url, data, { headers });
  }

  update(data: SubCategory) {
    let url = API.BASE_URL + `/cms/sub-category/${data._id}/update`;
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.put<any>(url, data, { headers });
  }

  delete(id: string) {
    let url = API.BASE_URL + `/cms/sub-category/${id}/`;
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.delete<any>(url, { headers });
  }

  getCount() {
    let url = API.BASE_URL + `/cms/count/subcategory`;
    return this.http.get(url);
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
