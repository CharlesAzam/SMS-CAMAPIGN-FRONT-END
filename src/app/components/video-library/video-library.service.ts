import { VideoLibrary } from './video-library';
import { VideoLibraryFilter } from './video-library-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
const API_URL = 'http://localhost:3000/cms'

@Injectable()
export class VideoLibraryService {
    
    constructor(private http: HttpClient) {
    }

    videoLibraryList: VideoLibrary[] = [];
  
    findById(id: string): Observable<VideoLibrary> {
        let url = API_URL + '/cdn/'+id; 
        let params = { "id": id };
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');
        return this.http.get<VideoLibrary>(url, {params, headers});
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


    find() {
        let url = API_URL+'/cdn-list';
        let headers = new HttpHeaders()
          .set('Accept', 'application/json');
        return this.http.get<any>(url, { headers })
      }


    // find(): Observable<VideoLibrary[]> {
    //     let url = API_URL;
    //     let headers = new HttpHeaders()
    //                         .set('Accept', 'application/json');
    //     return this.http.get<VideoLibrary[]>(url, {headers});
    // }

    save(entity: VideoLibrary): Observable<VideoLibrary> {
        let url = API_URL+'/cdn/create';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<VideoLibrary>(url, entity, {headers});
    }

    delete(id: string) {
        let url = API_URL+ `/cdn/${id}/`;
        let headers = new HttpHeaders()
          .set('Accept', 'application/json');
        return this.http.delete<any>(url, { headers });
      }

    update(data:any) {
        let url = API_URL+`/cdn/${data._id}/update`;
        let headers = new HttpHeaders()
          .set('Accept', 'application/json');
        return this.http.put<any>(url, data, { headers });
      }
}

