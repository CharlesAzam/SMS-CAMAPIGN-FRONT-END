import { VideoLibrary } from './video-library';
import { VideoLibraryFilter } from './video-library-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from 'src/environments/environment';

@Injectable()
export class VideoLibraryService {

  constructor(private http: HttpClient) {
  }

  videoLibraryList: VideoLibrary[] = [];

  findById(id: string): Observable<VideoLibrary> {
    let url = API.BASE_URL + '/cms/cdn/' + id;
    // let params = { "id": id };
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<VideoLibrary>(url, { headers });
  }

  // load(): void {
  //     this.find().subscribe(
  //         result => {
  //             this.videoLibraryList = result;
  //         },
  //         err => {
  //             console.error('error loading', err);
  //         }
  //     )
  // }


  find(index?, size?): Observable<VideoLibrary[]> {
    let url = API.BASE_URL + '/cms/cdn-list';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');

    if (index !== null || size !== null) {
      let params = {
        "pageNumber": index,
        "size": size
      };
      return this.http.get<any>(url, { params, headers })
    }
    return this.http.get<any>(url, { headers })
  }


  // find(): Observable<VideoLibrary[]> {
  //     let url = API_URL;
  //     let headers = new HttpHeaders()
  //                         .set('Accept', 'application/json');
  //     return this.http.get<VideoLibrary[]>(url, {headers});
  // }

  save(entity: VideoLibrary): Observable<VideoLibrary> {
    let url = API.BASE_URL + '/cms/cdn/create';
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.post<VideoLibrary>(url, entity, { headers });
  }

  delete(id: string) {
    let url = API.BASE_URL + `/cms/cdn/${id}/`;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.delete<any>(url, { headers });
  }

  update(data: any) {
    let url = API.BASE_URL + `/cms/cdn/${data._id}/update`;
    let headers = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.put<any>(url, data, { headers });
  }

  getCount() {
    let url = API.BASE_URL + `/cms/count/content`;
    return this.http.get(url);
  }

}

