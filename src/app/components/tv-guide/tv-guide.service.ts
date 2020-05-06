import { Guide } from "./tv-guide";
import { GuideFilter } from "./tv-guide-filter";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { API } from "src/environments/environment";
// const API_URL = 'http://localhost:3000/cms'

@Injectable()
export class GuideService {
  constructor(private http: HttpClient) {}

  guideList: Guide[] = [];

  findById(id: string): Observable<Guide> {
    let url = API.BASE_URL + `/cms/program/${id}`;

    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<Guide>(url, { headers });
  }

  uploadUrl(fileToUpload: File): Observable<Object> {
    let headers = new HttpHeaders();
    const endpoint = API.BASE_URL + "/cms/upload-file";
    const formData: FormData = new FormData();
    console.log("fileToUpload", fileToUpload);
    formData.append("file", fileToUpload, fileToUpload.name);
    console.log("=====>", formData);
    return this.http.post(endpoint, formData, { headers });
  }

  load(filter: GuideFilter): void {
    this.find().subscribe(
      (result) => {
        this.guideList = result;
      },
      (err) => {
        console.error("error loading", err);
      }
    );
  }

  find(pageIndex?, pageSize?): Observable<Guide[]> {
    let url = API.BASE_URL + "/cms/program-list";
    let headers = new HttpHeaders().set("Accept", "application/json");

    if (pageIndex || pageSize) {
      let params = {
        pageNumber: pageIndex,
        size: pageSize,
      };
      return this.http.get<Guide[]>(url, { params, headers });
    }
    return this.http.get<Guide[]>(url, { headers });
  }

  delete(id: string) {
    let url = API.BASE_URL + `/cms/program/${id}/`;
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.delete<any>(url, { headers });
  }

  update(data: Guide) {
    let url = API.BASE_URL + `/cms/program/${data._id}/update`;
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.put<any>(url, data, { headers });
  }

  save(entity: Guide): Observable<Guide> {
    let url = API.BASE_URL + "/cms/program/create";
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.post<Guide>(url, entity, { headers });
  }
  bulkUpload(entity: Guide[]): Observable<Guide[]> {
    let url = API.BASE_URL + "/cms/program-list/create";
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.post<Guide[]>(url, entity, { headers });
  }

  getCount() {
    let url = API.BASE_URL + `/cms/count/programs`;
    return this.http.get(url);
  }
}
