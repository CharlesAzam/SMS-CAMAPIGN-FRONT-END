import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {MobileTags} from '../../app/models/mobile-tags'

@Injectable({
  providedIn: 'root'
})
export class MobileTagsService {
 _url="http://localhost:3000/cms/tag/create";

  constructor(private _http: HttpClient) { }

  cresteMobileTag(Mobiletags: MobileTags){
    let params = { "name": "mimi","type":"low" };
    let headers = new HttpHeaders()
    .set('Accept', 'application/json');
    return this._http.post<any>(this._url,Mobiletags,{headers,params})

  }
}
