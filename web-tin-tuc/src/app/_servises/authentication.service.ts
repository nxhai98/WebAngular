    import { Injectable } from '@angular/core';
    import {HttpClient} from '@angular/common/http';
    import {BehaviorSubject, Observable} from 'rxjs';
    import {Router} from '@angular/router';
    import {map} from 'rxjs/operators';
    import {user} from '../_models/User';

    @Injectable({
    providedIn: 'root'
    })
    export class AuthenticationService {

        private currentUserSubject: BehaviorSubject<user>;
        public currentUser: Observable<user>;

        constructor(
            private http: HttpClient,
            private router: Router,
            ) {
            this.currentUserSubject = new BehaviorSubject<user>(JSON.parse(localStorage.getItem('currentUser')));
            this.currentUser = this.currentUserSubject.asObservable();
        }

        public get currentUserValue(): user {
            return this.currentUserSubject.value;
        }

        logIn(userName: string, passwd: string) {

            return this.http.post<any>('http://127.0.0.1:3000/login', {userName, passwd})
                // tslint:disable-next-line: no-shadowed-variable
                .pipe( map (user => {
                    if (user && user.token) {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.currentUserSubject.next(user);
                    }
                    return user;
                }));
        }


        logOut() {
            localStorage.removeItem('currentUser');
            this.currentUserSubject.next(null);
            this.router.navigate(['/login']);
        }
    }
