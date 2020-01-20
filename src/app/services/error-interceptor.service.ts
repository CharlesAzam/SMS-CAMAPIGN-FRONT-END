import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { AuthenticationService } from '../components/login/login.service';
import { MatDialog } from '@angular/material';
import { ErrorDialog } from '../components/error-dialog/dialog-error';
import { ActivatedRoute } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, public dialog: MatDialog, private activatedRoute: ActivatedRoute) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage: any;
                    if (error.error) {
                        let message = `Error: ${error.error.message}`;
                        errorMessage = { status: error.status, message: message }
                    } else {
                        // server-side error
                        if (error.status === 403)
                            errorMessage = { status: error.status, message: 'Insufficient Priveleges, Contact adminstrator' }
                        else
                            errorMessage = { status: error.status, message: error.message }
                    }
                    const ref = this.dialog.open(ErrorDialog, {
                        width: '400px',
                        data: errorMessage
                    });
                    ref.afterClosed().subscribe((result) => {
                        if (error.status === 401) {
                            this.authenticationService.logout();
                        }
                    })
                    return throwError(errorMessage);
                })
            )
    }
}
