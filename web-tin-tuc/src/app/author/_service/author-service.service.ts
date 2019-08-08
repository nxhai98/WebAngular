    import { Injectable } from '@angular/core';
    import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
    import { AuthenticationService } from 'src/app/_servises/authentication.service';
    import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

    @Injectable({
        providedIn: 'root'
    })



    export class AuthorServiceService {

        url = 'http://127.0.0.1:3000/'
        Options;

        constructor(
            private http: HttpClient,
            private authenticateService: AuthenticationService,
        ) { }

        get HttpOptions(){
            if(this.Options){
                return this.Options;
            }else{
                this.Options = {
                    headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticateService.currentUserValue.token, 'Access-Control-Allow-Origin' : "*" })
                };
                return this.Options;
            }
        }

        addNews(news){
            return this.http.post(this.url + 'news/', news, this.HttpOptions).pipe(
                tap(),
                catchError(this.handleError),
            )
        }

        updateNews(id, news){
            return this.http.put(this.url+'news/id/'+ id, news, this.HttpOptions).pipe(
                tap(),
                catchError(this.handleError)
            )
        }
        

        removeNews(id){
            return this.http.delete(this.url + 'news/id/' + id, this.HttpOptions).pipe(
                tap(),
                catchError(this.handleError)
            )
        }

        private handleError(error: HttpErrorResponse) {
            if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error("An error occurred:", error.error.message);
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

