// import { LeagueFilter } from "../components/homepage/categories/categories-filter";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CategoryFilter } from "../components/homepage/category/category-filter";
import { Categories } from "../models/categories";
import { League } from "../models/league-model";
import { API } from "src/environments/environment";

@Injectable()
export class LeagueService {
  constructor(private http: HttpClient) {}
  leagueList: League[] = [];
  findById(id: string): Observable<League> {
    let url = API.BASE_URL + "/cms/league/" + id;
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
    let url = API.BASE_URL + "/cms/league-list";
    let headers = new HttpHeaders().set("Accept", "application/json");
    if (pageNumber !== null || size !== null) {
      let params = {
        pageNumber: pageNumber,
        size: size
      };
      return this.http.get<League[]>(url, { params, headers });
    }
    return this.http.get<League[]>(url, { headers });
  }
  save(entity: League): Observable<League> {
    let url = API.BASE_URL + "/cms/league/create";
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.post<League>(url, entity, { headers });
  }

  update(entity: League): Observable<League> {
    let url = API.BASE_URL + `/cms/league/${entity._id}/update`;
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.put<League>(url, entity, { headers });
  }

  delete(id: string): Observable<League> {
    let url = API.BASE_URL + `/cms/league/${id}/delete`;
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.put<League>(url, { headers });
  }

  getCount() {
    let url = API.BASE_URL + `/cms/count/league`;
    return this.http.get(url);
  }
}
