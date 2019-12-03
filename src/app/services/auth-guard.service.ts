import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../components/login/login.service';
@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public auth: AuthenticationService, public router: Router) { }

    canActivate(): boolean {
        if (!this.auth.currentUserValue) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}