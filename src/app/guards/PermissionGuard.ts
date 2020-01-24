import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../components/login/login.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

    constructor(private authService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let data = route.data['moduleData'] as Array<string>;

        if (data.length > 1)
            return this.authService.isModuleAllowed(data[0]);
        else
            return this.authService.isModuleAllowed(data[0], data[1]);

    }
}
