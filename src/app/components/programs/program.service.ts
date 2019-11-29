import { Program } from './program';
import { ProgramFilter } from './program-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from 'src/environments/environment';
// const API_URL = 'http://localhost:3000/cms'

@Injectable()
export class ProgramService {

    constructor(private http: HttpClient) {
    }

    programList: Program[] = [];

    findById(id: string): Observable<Program> {
        let url = API.BASE_URL + `/cms/program/${id}`;

        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.get<Program>(url, { headers });
    }


    uploadUrl(fileToUpload: File): Observable<Object> {
        let headers = new HttpHeaders()
        const endpoint = API.BASE_URL + '/cms/upload-file';
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post(endpoint, formData, { headers })
    }

    load(filter: ProgramFilter): void {
        this.find().subscribe(
            result => {
                this.programList = result;
            },
            err => {
                console.error('error loading', err);
            }
        )
    }

    find(pageIndex?, pageSize?): Observable<Program[]> {
        let url = API.BASE_URL + '/cms/program-list';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');

        if (pageIndex || pageSize) {
            let params = {
                "pageNumber": pageIndex,
                "size": pageSize
            };
            return this.http.get<Program[]>(url, { params, headers });
        }
        return this.http.get<Program[]>(url, { headers });

    }

    delete(id: string) {
        let url = API.BASE_URL + `/cms/program/${id}/`;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.delete<any>(url, { headers });
    }

    update(data: Program) {
        let url = API.BASE_URL + `/cms/program/${data._id}/update`;
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.put<any>(url, data, { headers });
    }

    save(entity: Program): Observable<Program> {
        let url = API.BASE_URL + '/cms/program/create';
        // let url = 'http://192.168.0.208:3000/cms/program/create';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<Program>(url, entity, { headers });
    }

    getCount() {
        let url = API.BASE_URL + `/cms/count/programs`;
        return this.http.get(url);
    }
}

