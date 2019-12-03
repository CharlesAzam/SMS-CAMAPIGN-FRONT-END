import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from '../components/login/login.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                if (event.status === 401 || event.body.status === 401) {
                    this.authenticationService.logout();
                    location.reload(true);
                }
            }
            return event;
        }));
    }
}
