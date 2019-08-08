import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Catalog } from '../_models/Catalog';
import { News } from '../_models/News';
import { Comment } from '../_models/Comment';
import { user } from '../_models/User';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    currentUser;
    opt;
    constructor(
        private http: HttpClient,
        private auth: AuthenticationService
    ) {
        this.currentUser = this.auth.currentUserValue;
    }
    url = 'http://127.0.0.1:3000/';

    get httpOptions() {
        if (this.opt) {
            return this.opt;
        }
        this.opt = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.auth.currentUserValue.token, 'Access-Control-Allow-Origin': '*'
            }
            )
        };
        return this.opt;
    }

    getNewsByPage(page) {
        return this.http.get(this.url + 'news/page/' + page).pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    getNewsByCatalog(page, catalogId) {
        return this.http.get(this.url + 'news/catalog/' + catalogId + '/page/' + page).pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    getNewCountByCatalog(catalogId) {
        return this.http.get<number>(this.url + 'news/catalog/' + catalogId + '/page').pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    getMaxPage() {
        return this.http.get<number>(this.url + 'news/page/').pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    getNewsById(id: number) {
        return this.http.get<News>(this.url + 'news/id/' + id).pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    getlistNews() {
        // author only
        return this.http.get<News[]>(this.url + 'news/author', this.httpOptions).pipe(
            tap(),
            catchError(this.handleError),
        );
    }

    getListCatalog() {
        return this.http.get<Catalog[]>(this.url + 'admin/catalogs/').pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    getListChildCatalog(id) {
        return this.http.get(this.url + 'admin/catalogs/' + id).pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    getListComment(newId) {
        return this.http.get<Comment[]>(this.url + 'comments/news/' + newId).pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    addComment(comment) {
        return this.http.post(this.url + 'comments/', comment, this.httpOptions).pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    changePasswd(data) {
        return this.http.put('http://localhost:3000/user/password/', data, this.httpOptions).pipe(
            tap(),
            catchError(this.handleError),
        );
    }

    getProfile(id) {
        return this.http.get(this.url + 'user/' + id, this.httpOptions).pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    // tslint:disable-next-line: no-shadowed-variable
    updateUser(id, user) {
        return this.http.put(this.url + 'admin/users/' + id, user, this.httpOptions).pipe(
            tap(),
            catchError(this.handleError),
        );
    }



    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` + `body was: ${error.error}`
            );
        }
        // return an observable with a user-facing error message
        return throwError(error);
    }
}
