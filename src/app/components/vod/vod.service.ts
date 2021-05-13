import { Vod } from './vod';
import { VodFilter } from './vod-filter';
import { Injectable } from '@angular/core';
import { Observable,Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment }from 'src/environments/environment';

@Injectable()
export class VodService {

    constructor(private http: HttpClient) {
    }

    categorySubject= new Subject<any>();
    category$=this.categorySubject.asObservable();

    vodList: Vod[] = [];

    uploadUrl(fileToUpload: File): Observable<Object> {
        let headers = new HttpHeaders()
        const endpoint = environment.apiUrl + '/cms/upload-file';
        const formData: FormData = new FormData();
        console.log("fileToUpload", fileToUpload)
        formData.append('file', fileToUpload, fileToUpload.name);
        console.log("=====>", formData);
        return this.http.post(endpoint, formData, { headers })
    }


    findById(id: string): Observable<Vod> {
        let url = environment.apiUrl + '/cms/get-content/' + id;

        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.get<Vod>(url, { headers });
    }

    load(filter: VodFilter, route: String): void {
        this.find(route).subscribe(
            result => {
                this.vodList = result;
            },
            err => {
                console.error('error loading', err);
            }
        )
    }

    find(route: String, pageNumber?: string, size?: string, filter?: string): Observable<Vod[]> {
        let url = environment.apiUrl + '/cms/content/' + route;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');

        if (pageNumber || size) {
            let params = {
                "pageNumber": pageNumber,
                "size": size
            };
            if(filter){
                params['filter'] = filter;
            }
            return this.http.get<any[]>(url, { params, headers });
        }

        return this.http.get<Vod[]>(url, { headers });
    }

    save(entity: Vod): Observable<any> {
        let url = environment.apiUrl + '/cms/content/create';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<any>(url, entity, { headers });
    }

    update(data: Vod) {
        let url = environment.apiUrl + `/cms/content/${data._id}/update`;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.put<any>(url, data, { headers });
    }

    delete(data: Vod) {
        let url = environment.apiUrl + `/cms/content/${data._id}/delete`;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.put<any>(url, data, { headers });
    }


    getCount(contentType) {
        let url = environment.apiUrl + `/cms/count/content/${contentType}`;
        return this.http.get(url);
    }

    getCount2(contentType) {
        let url = environment.apiUrl + `/cms/count/content/${contentType}`;
        return this.http.get<any>(url).pipe(map(result=>{
            console.log("This is return value \n"+JSON.stringify(result));
            return result;
        }));
    }

    getNotification(category){
      this.categorySubject.next();
    }

    getChannels(){
        let url = environment.apiUrl + `/cms/channels`;
        return this.http.get(url);
    }
}

