import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { user } from 'src/app/_models/User';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

    editForm: FormGroup;
    isSubmit = false;

    constructor(
        public dialogRef: MatDialogRef<EditUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: user,
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.editForm = this.formBuilder.group({
            userName: [this.data.userName, Validators.required],
            fullName: [this.data.fullName, Validators.required],
            email: [this.data.email, [Validators.required, Validators.email]],
            gender: [this.data.gender, Validators.required]
        });
    }

    get f() {
        return this.editForm.controls;
    }

    close(): void {
        this.dialogRef.close();
    }
    save() {
        this.isSubmit = true;
        if (this.editForm.invalid) {
            return;
        }
        this.dialogRef.close(this.editForm.value);
    }

}
