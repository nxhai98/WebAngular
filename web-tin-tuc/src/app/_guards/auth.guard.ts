    import { Injectable } from '@angular/core';
    import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
    import { Observable } from 'rxjs';
    import { AuthenticationService } from '../_servises/authentication.service';

    @Injectable({
    providedIn: 'root'
    })
    export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        // da dang nhap truoc do
        // doi pass tai may khac == di ngay va luon
        if (currentUser) {
            if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
                this.router.navigate(['/']);
                return false;
            }
            return true;
        }
        //
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
    }
}
