    import { Component, OnInit, Inject } from '@angular/core';
    import {FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms';
    import {AdminService} from '../_services/admin.service';
    import { user } from 'src/app/_models/User';
    import {Role} from '../../_models/Role';
    import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

    @Component({
        selector: 'app-add-user',
        templateUrl: './add-user.component.html',
        styleUrls: ['./add-user.component.css']
    })
    export class AddUserComponent implements OnInit {

        isSubmit = false;
        addUserForm: FormGroup;
        role: Role;
        constructor(
            private adminService: AdminService,
            private formBuilder: FormBuilder,
            public dialogRef: MatDialogRef<AddUserComponent>,
            @Inject(MAT_DIALOG_DATA) public data :user,
        ) { }

        get f(){
            return this.addUserForm.controls;
        }

        ngOnInit() {
            this.addUserForm = this.formBuilder.group({
                userName: ['', Validators.required],
                password: ['', [Validators.required ,Validators.minLength(6)]],
                confirmPassword: ['', Validators.required],
                fullName: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                gender: ['', Validators.required],
                role: [Role.user, Validators.required]
            },{
                validators: (formGroup: FormGroup) => {
                    let password = formGroup.controls['password'];
                    let confirm = formGroup.controls['confirmPassword'];
                    if(confirm.errors && !confirm.errors.mustMatch){
                        return;
                    }
                    if(password.value !== confirm.value){
                        confirm.setErrors({mustMatch: true});
                    }
                    else{
                        confirm.setErrors(null);
                    }
                }
            });
        }

        onSubmit(user: user){   
            this.isSubmit = true;
            if(this.addUserForm.invalid){
                return;
            }
            this.dialogRef.close(this.addUserForm.value);
        }
        close(){
            this.dialogRef.close();
        }
    }
