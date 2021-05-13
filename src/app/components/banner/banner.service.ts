import { Banner } from './banner';
import { BannerFilter } from './banner-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment }from 'src/environments/environment';

@Injectable()
export class BannerService {

    constructor(private http: HttpClient) {
    }

    bannerList: Banner[] = [];

    findById(id: string): Observable<Banner> {
        let url = environment.apiUrl + `/cms/banner/${id}`;

        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.get<Banner>(url, { headers });
    }


    uploadUrl(fileToUpload: File): Observable<Object> {
        let headers = new HttpHeaders()
        const endpoint = environment.apiUrl+'/cms/upload-file';
        const formData: FormData = new FormData();
        console.log("fileToUpload", fileToUpload)
        formData.append('file', fileToUpload, fileToUpload.name);
        console.log("=====>",formData);
        return this.http.post(endpoint, formData, {headers})
    }

    load(filter: BannerFilter): void {
        this.find().subscribe(
            result => {
                this.bannerList = result;
            },
            err => {
                console.error('error loading', err);
            }
        )
    }

    find(pageIndex?, pageSize?, filter=''): Observable<Banner[]> {
        let url = environment.apiUrl + '/cms/banner-list';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');

        if (pageIndex || pageSize ) {
            let params = {
                "pageNumber": pageIndex,
                "size": pageSize,
                "filter":filter
            };
            return this.http.get<Banner[]>(url, { params, headers });
        }
        return this.http.get<Banner[]>(url, { headers });

    }

    delete(id: string) {
        let url = environment.apiUrl + `/cms/banner/${id}/`;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.delete<any>(url, { headers });
    }

    update(data: Banner) {
        let url = environment.apiUrl + `/cms/banner/${data._id}/update`;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.put<any>(url, data, { headers });
    }

    save(entity: Banner): Observable<Banner> {
        let url = environment.apiUrl + '/cms/banner/create';
        // let url = 'http://192.168.0.208:3000/cms/banner/create';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<Banner>(url, entity, { headers });
    }

    getCount() {
        let url = environment.apiUrl + `/cms/count/banners`;
        return this.http.get(url);
    }
}

