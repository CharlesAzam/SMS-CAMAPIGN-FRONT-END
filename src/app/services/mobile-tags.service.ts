import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {MobileTags} from '../../app/models/mobile-tags'

@Injectable({
  providedIn: 'root'
})
export class MobileTagsService {
 url="http://localhost:3000/cms/";

  constructor(private http: HttpClient) { }

  find(){
    let url = 'http://34.245.129.208:3000/cms/category-list';
    //let params = { "name": "mimi","type":"low" };
    let headers = new HttpHeaders()
    .set('Accept', 'application/json');
    return this.http.get<any>(url,{headers})

  }
findById(id: string){
    let url = 'http://34.245.129.208:3000/cms/tag-list';
    let params = { "id": id };
    let headers = new HttpHeaders()
        .set('Accept', 'application/json');
    return this.http.get<any>(url, { params, headers });
}

save(Mobiletags: MobileTags){
  let url = 'http://34.245.129.208:3000/cms/tag/create';
  let headers = new HttpHeaders()
      .set('Accept', 'application/json');
  return this.http.post<any>(url, MobileTags, { headers });
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
