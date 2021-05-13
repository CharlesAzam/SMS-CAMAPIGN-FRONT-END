import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MobileTags } from '../../app/models/mobile-tags'
import { environment }from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MobileTagsService {

  constructor(private http: HttpClient) { }

  find(pageNumber?, size?, language?, filter?) {
    let url = environment.apiUrl + '/cms/tag-list';
    //let params = { "name": "mimi","type":"low" };
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    let params: any = {};

    if (pageNumber) {
      params.pageNumber = pageNumber
    }

    if (language) {
      params.language = language
    }

    if (size) {
      params.size = size
    }

    if (filter) {
      params.filter = filter
    }

    if (params) {
      return this.http.get<any[]>(url, { params, headers });
    }
    return this.http.get<any[]>(url, { headers });

  }

  findById(id: string) {
    let url = environment.apiUrl + '/cms/tag/' + id;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<any>(url, { headers });
  }

  save(data: MobileTags) {
    let url = environment.apiUrl + '/cms/tag/create';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<any>(url, data, { headers });
  }

  update(data: MobileTags) {
    let url = environment.apiUrl + `/cms/tag/${data._id}/update`;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.put<any>(url, data, { headers });
  }

  delete(id: string) {
    let url = environment.apiUrl + `/cms/tag/${id}/`;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.put<any>(url, { headers });
  }

  getCount(language?) {
    let url = environment.apiUrl + `/cms/count/tags${language ? '?language=' + language : ''}`;
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
