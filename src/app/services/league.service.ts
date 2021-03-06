// import { LeagueFilter } from "../components/homepage/categories/categories-filter";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { League } from "../models/league-model";
import { environment }from "src/environments/environment";

@Injectable()
export class LeagueService {
  constructor(private http: HttpClient) { }
  leagueList: League[] = [];
  findById(id: string): Observable<League> {
    let url = environment.apiUrl + "/cms/league/" + id;
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<League>(url, { headers });
  }
  // load(filter: LeagueFilter): void {
  //     this.find().subscribe((result: any) => {
  //         this.categoriesList = result.data;
  //         console.log(this.categoriesList);
  //     }, err => {
  //         console.error('error loading', err);
  //     });
  // }
  find(pageNumber?, size?): Observable<League[]> {
    let url = environment.apiUrl + "/cms/league-list";
    let headers = new HttpHeaders().set("Accept", "application/json");
    if (pageNumber  || size ) {
      let params = {
        pageNumber: pageNumber,
        size: size
      };
      return this.http.get<League[]>(url, { params, headers });
    }
    return this.http.get<League[]>(url, { headers });
  }
  save(entity: League): Observable<League> {
    let url = environment.apiUrl + "/cms/league/create";
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.post<League>(url, entity, { headers });
  }

  update(entity: League): Observable<League> {
    let url = environment.apiUrl + `/cms/league/${entity._id}/update`;
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.put<League>(url, entity, { headers });
  }

  delete(id: string): Observable<League> {
    let url = environment.apiUrl + `/cms/league/${id}/delete`;
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.put<League>(url, { headers });
  }

  getCount() {
    let url = environment.apiUrl + `/cms/count/league`;
    return this.http.get(url);
  }

  uploadUrl(fileToUpload: File): Observable<Object> {
    let headers = new HttpHeaders()
    const endpoint = environment.apiUrl + '/cms/upload-file';
    const formData: FormData = new FormData();
    console.log("fileToUpload", fileToUpload)
    formData.append('file', fileToUpload, fileToUpload.name);
    console.log("=====>", formData);
    return this.http.post(endpoint, formData, { headers })
  }

}
