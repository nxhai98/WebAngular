    import { Component, OnInit } from '@angular/core';
    import {Validators, FormBuilder, FormGroup} from '@angular/forms';
    import {Router, ActivatedRoute} from '@angular/router';
    import { AuthenticationService } from '../_servises/authentication.service';
    import { first } from 'rxjs/operators';

    @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
    })
    export class LoginComponent implements OnInit {
        loginForm: FormGroup;
        loading = false;
        submited = false;
        returnUrl: string;
        error = '';
        constructor(
            private formBuilder: FormBuilder,
            private router: Router,
            private activeRoute: ActivatedRoute,
            private authenticationService: AuthenticationService,

        ) {
            // if logged
            if (this.authenticationService.currentUserValue) {
                this.router.navigate(['/']);
            }
        }


        ngOnInit() {
            this.loginForm = this.formBuilder.group({
                userName: ['', Validators.required],
                passwd: ['', Validators.required],
            });

            // get return url or defaul by '/'
            this.returnUrl = this.activeRoute.snapshot.queryParams[`returnUrl`] || '/';
        }

        get f() {
            return this.loginForm.controls;
        }

        onSubmit(value) {
            this.submited = true;
            if (this.loginForm.invalid) {
                return;
            }

            this.loading = true;

            this.authenticationService.logIn(value.userName, value.passwd)
                .pipe(first())
                .subscribe(
                    data => {
                        this.router.navigate([this.returnUrl]);
                    },
                    error => {
                        this.error = error;
                        this.loading = false;
                        console.log(error);
                    }
                );
        }

    }
