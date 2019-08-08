    import { Component, OnInit } from '@angular/core';
    import {FormBuilder, FormGroup, Validators} from '@angular/forms';
    import {MatDialogRef} from '@angular/material/dialog';
    import {UserService} from '../_servises/user.service';
    import {AuthenticationService} from '../_servises/authentication.service';


    @Component({
        selector: 'app-change-passwd',
        templateUrl: './change-passwd.component.html',
        styleUrls: ['./change-passwd.component.css']
    })
    export class ChangePasswdComponent implements OnInit {
        changePassForm: FormGroup;
        submitted = false;
        error;

        constructor(
            private userService: UserService,
            private dialogRef: MatDialogRef<ChangePasswdComponent>,
            private formBuilder: FormBuilder,
            private auth: AuthenticationService,
        ) { }

        ngOnInit() {
            this.changePassForm = this.formBuilder.group({
                oldPass: ['', Validators.required],
                newPass: ['', Validators.required],
                confirm: ['', Validators.required],
            }, {
                validators: (formGroup: FormGroup) => {
                    const password = formGroup.controls[`newPass`];
                    const confirm = formGroup.controls[`confirm`];
                    if (confirm.errors && !confirm.errors.mustMatch) {
                        return;
                    }
                    if (password.value !== confirm.value) {
                        confirm.setErrors({mustMatch: true});
                    } else {
                        confirm.setErrors(null);
                    }
                }
            });
        }

        get f() {
            return this.changePassForm.controls;
        }

        close() {
            this.dialogRef.close();
        }


        onSubmit(data) {
            this.submitted = true;
            if (this.changePassForm.invalid) {
                return;
            } else {
                this.userService.changePasswd(data).subscribe(
                    result => {
                        if (confirm('Do you want to logout???')) {
                            this.auth.logOut();
                        }
                        this.dialogRef.close();
                    },
                    error => {
                        this.error = error.error.message;
                    }
                );
            }
        }


    }
