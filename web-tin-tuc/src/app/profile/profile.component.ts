import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../_servises/user.service';
import { AuthenticationService } from '../_servises/authentication.service';
import {user} from '../_models/User';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    currentUser;
    infoForm;
    submitted = false;
    loading = false;
    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<ProfileComponent>,
        @Inject(MAT_DIALOG_DATA) public data: number,
    ) {
    }

    ngOnInit() {
        console.log(this.data);
        this.userService.getProfile(this.data).subscribe(result => {
            this.currentUser = result;
            this.infoForm = this.formBuilder.group({
                fullName: [this.currentUser.fullName, Validators.required],
                email: [this.currentUser.email, [Validators.required, Validators.email]],
                gender: [this.currentUser.gender, Validators.required],
            });
        });
        this.infoForm = this.formBuilder.group({
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            gender: ['', Validators.required],
        });
    }

    get f() { return this.infoForm.controls; }


    // tslint:disable-next-line: no-shadowed-variable
    onSubmit(user) {
        this.submitted = true;
        if (this.infoForm.invalid) {
            return;
        }
        this.loading = true;
        user.userName = this.currentUser.userName;
        this.userService.updateUser(this.currentUser.id, user).subscribe(result => {
            this.dialogRef.close();
            this.loading = true;
        });
    }

    close() {
        this.dialogRef.close();
    }

}
