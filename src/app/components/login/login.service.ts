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
                // user.userInfo
                user.accessList.length > 0 ? user.accessList = this.orderAccessList(user.accessList) : user.accessList = {};
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    isModuleAllowed(moduleName: string, action?: string) {
        let user = this.currentUserValue;
        if (action) {
            return user.accessList[moduleName.toLowerCase()].permissions.includes(action.toLowerCase())
        } else {
            return user.accessList[moduleName.toLowerCase()] ? true : false;
        }
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    orderAccessList(access: any[]) {
        return access.reduce((accumulator, currentValue) => {
            if (accumulator[currentValue.module.toLowerCase()]) {
                accumulator[currentValue.module.toLowerCase()]['permissions'].push(currentValue.action.toLowerCase());
                return accumulator;
            }
            else {
                let permissions = [];
                permissions.push(currentValue.action.toLowerCase());
                let permission = { permissions: permissions }
                accumulator[currentValue.module.toLowerCase()] = permission
                return accumulator;
            }
        })

    }
}