import { Movies } from '../models/movies';
import { MoviesFilter } from '../components/movie/movies-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { apiDetails} from '../../environments/environment'
@Injectable()
export class MoviesService {
    
    constructor(private http: HttpClient) {
    }

    moviesList: Movies[] = [];
  
    findById(id: string): Observable<Movies> {
        let url = apiDetails.baseURL+'Movies'; 
        let params = { "id": id };
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');
        return this.http.get<Movies>(url, {params, headers});
    }
    
    load(filter: MoviesFilter): void {
        this.find(filter).subscribe(
            result => {
                this.moviesList = result;
            },
            err => {
                console.error('error loading', err);
            }
        )
    }

    find(filter: MoviesFilter): Observable<Movies[]> {
        let url = 'http://34.245.129.208:3001/api/Movies';
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        let params = {
            "filter":`{"movieName": ${filter.movieName}}`
        };

        return this.http.get<Movies[]>(url, {params, headers});
    }

    save(entity: Movies): Observable<Movies> {
        let url = 'http://34.245.129.208:3001/api/Movies';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<Movies>(url, entity, {headers});
    }
}

