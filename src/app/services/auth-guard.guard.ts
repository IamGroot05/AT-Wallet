import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService {
    constructor(private auth: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.auth.validateUserTocken()) {
            return true;
        } else {
            this.router.navigate(['/login'], {
                queryParams: {
                    returnUrl: state.url
                }
            });
            return false;
        }
    }
}


