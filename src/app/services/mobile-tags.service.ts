import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MobileTags } from '../../app/models/mobile-tags'
import { API } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MobileTagsService {
  url = "http://localhost:3001/cms/";

  constructor(private http: HttpClient) { }

  find() {
    let url = API.BASE_URL+'/cms/tag-list';
    //let params = { "name": "mimi","type":"low" };
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<any>(url, { headers })

  }
  findById(id: string) {
    let url = API.BASE_URL+'/cms/tag/'+id;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<any>(url, { headers });
  }

  save(data: MobileTags) {
    let url = API.BASE_URL+'/cms/tag/create';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<any>(url, data, { headers });
  }

  update(data: MobileTags) {
    let url = API.BASE_URL+`/cms/tag/${data._id}/update`;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.put<any>(url, data, { headers });
  }

  delete(id: string) {
    let url = API.BASE_URL+`/cms/tag/${id}/`;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.put<any>(url, { headers });
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
