import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { AuthenticationService } from '../../_servises/authentication.service';
import { user } from 'src/app/_models/User';
import { News } from 'src/app/_models/News';
import { Catalog } from 'src/app/_models/Catalog';


@Injectable({
    providedIn: 'root'
})
export class AdminService {
    currentUser: user;
    url = 'http://127.0.0.1:3000/admin/';
    urlForNews = 'http://127.0.0.1:3000/';
    httpOptions;
    constructor(
        private http: HttpClient,
        private authenticateService: AuthenticationService,
    ) {
        this.currentUser = authenticateService.currentUserValue;
        this.httpOptions = {
            headers: new HttpHeaders({ Authorization: 'Bearer ' + this.currentUser.token, 'Access-Control-Allow-Origin': '*' })
        };
    }
    dataFake: user[] = [
        { id: 1, userName: 'khongminh123', role: 'User', email: 'luong.gc@gmail.com', fullName: 'Gia Cát Lượng', gender: 'male' },
        { id: 2, userName: 'ngochoang', role: 'User', email: 'hoang.nv@gmail.com', fullName: 'Không Nhớ', gender: 'male' },

    ];

    // fakeNews: News[] = [
    //     {id: 1, title: 'Vụ thu hồi sổ đỏ loạt chung cư: Cần làm rõ trách nhiệm người ra quyết ...',  ]

    fakeCatalog: Catalog[] = [
        { id: 1, name: 'Pháp luật', description: 'phap luat' }
    ];
    // user-manage
    getListUser(page) {
        return this.http.get(this.url + 'users/page/' + page, this.httpOptions).pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    getPageUserCount() {
        return this.http.get(this.url + 'users/page/', this.httpOptions).pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    // tslint:disable-next-line: no-shadowed-variable
    addUser(user: any) {
        return this.http.post(this.url + 'users/', user, this.httpOptions).pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    searchUser(key) {
        return this.http.get(this.url + 'users/search/' + key, this.httpOptions).pipe(
            tap(),
            catchError(this.handleError),
        );
    }

    removaUser(id) {
        return this.http.delete(this.url + 'users/' + id, this.httpOptions).pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    // tslint:disable-next-line: no-shadowed-variable
    updateUser(id, user) {
        return this.http.put(this.url + 'users/' + id, user, this.httpOptions).pipe(
            tap(),
            catchError(this.handleError),
        );
    }

    // News Manager

    getListNews(page, status?) {
        if (status || status === 0) {
            return this.http.get(this.urlForNews + 'news/accept/page/' + page, this.httpOptions).pipe(
                tap(),
                catchError(this.handleError)
            );
        }
        return this.http.get(this.urlForNews + 'news/page/' + page).pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    getNewsById(id) {
        return this.http.get(this.urlForNews + 'news/id/' + id).pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    searchNew(key) {
        return this.http.get(this.urlForNews + 'news/search/' + key, this.httpOptions).pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    getPageCount(status?) {
        // if (status || status === 0) {
        //     return this.http.get<number>(this.urlForNews + 'news/accept/page/', this.httpOptions).pipe(
        //         tap(),
        //         catchError(this.handleError)
        //     );
        // }
        return this.http.get<number>(this.urlForNews + 'news/page/').pipe(
            tap(),
            catchError(this.handleError)
        );
    }


    addNews(news) {
        return this.http.post(this.urlForNews + 'news/', news, this.httpOptions).pipe(
            tap(),
            catchError(this.handleError),
        );
    }

    removeNews(id) {
        return this.http.delete(this.urlForNews + 'news/id/' + id, this.httpOptions).pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    updateNews(id, news) {
        return this.http.put(this.urlForNews + 'news/id/' + id, news, this.httpOptions).pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    // catalog mng
    getListCatalog() {
        return this.http.get(this.url + 'catalogs/', this.httpOptions).pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    getListRootCatalog() {
        return this.http.get(this.url + 'catalogs/root/', this.httpOptions).pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    searchCatalog(key) {
        return this.http.get(this.url + 'catalogs/search/' + key, this.httpOptions).pipe(
            tap(),
            catchError(this.handleError),
        );
    }

    addCatalog(catalog) {
        return this.http.post(this.url + 'catalogs/', catalog, this.httpOptions).pipe(
            tap(),
            catchError(this.handleError),
        );
    }

    removeCatalog(id) {
        return this.http.delete(this.url + 'catalogs/' + id, this.httpOptions).pipe(
            tap(),
            catchError(this.handleError),
        );
    }

    updateCatalog(id, catalog) {
        return this.http.put(this.url + 'catalogs/' + id, catalog, this.httpOptions).pipe(
            tap(),
            catchError(this.handleError),
        );
    }

    getAuthor() {
        return this.http.get(this.url + 'users/authors', this.httpOptions).pipe(
            tap(),
            catchError(this.handleError)
        );
    }


    // addIllus(data){
    //     console.log(data[0]);

    //     const formData = new FormData();
    //     let httpOptions = {
    //         headers: new HttpHeaders({'Authorization': 'Bearer ' + this.currentUser.token, 'Access-Control-Allow-Origin' : "*" }),
    //         reportProgress: true,
    //       };
    //     return this.http.post('http://localhost:3000/admin/imgs/upload/', formData, httpOptions).pipe(
    //         tap(),
    //         catchError(this.handleError)
    //     )
    // }


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
