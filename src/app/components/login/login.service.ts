import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './../../models/User-model';
import { API } from './../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        return this.http.post<any>(`${API.BASE_URL}/cms/login`, { username, password })
            .pipe(map(user => {
                console.log("user====>", user)
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                // user.
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    isModuleAllowed(moduleName: string) {
        let user = this.currentUserValue;
        if (user.userInfo.isSuperAdmin) {
            return true;
        } else {
            const result = user.accessList.find(object=> object.module.toLowerCase() === moduleName.toLowerCase());
            if(result)
                return true;
            else
                return false;
        }
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}