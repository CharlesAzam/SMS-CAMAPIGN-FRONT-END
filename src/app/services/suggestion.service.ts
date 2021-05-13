import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment }from "../../environments/environment";
import { Content_Suggestion } from '../models/content-suggestion';

@Injectable({
  providedIn: "root"
})
export class ContentSuggestionService {

  constructor(private http: HttpClient) {}

  fetch() {
    let url = environment.apiUrl + "/cms/suggestion/fetch";
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.get<any>(url, { headers });
  }
  
  save(data: Content_Suggestion) {
    let url = environment.apiUrl + "/cms/suggestion/update";
    let headers = new HttpHeaders().set("Accept", "application/json");
    return this.http.post<any>(url, data, { headers });
  }

}
