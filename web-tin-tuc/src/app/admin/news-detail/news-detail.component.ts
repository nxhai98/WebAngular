import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../_services/admin.service';
import { News } from 'src/app/_models/News';

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

    detailForm: FormGroup;
    catalogList;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private adminSevice: AdminService,
        public matdialogRef: MatDialogRef<NewsDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {

    }


    ngOnInit() {
        this.adminSevice.getListCatalog().subscribe(catalog => {
            this.catalogList = catalog;
        });
        this.detailForm = this.formBuilder.group({
            title: [this.data.title, Validators.required],
            author: [this.data.author, Validators.required],
            catalogId: [this.data.catalogId, Validators.required],
            description: [this.data.description],
            content: [this.data.content],
        });

    }

    get f() {
        return this.detailForm.controls;
    }

    close() {
        this.matdialogRef.close();
    }

    onSubmit() {
        this.submitted = true;

        if (this.detailForm.invalid) {
            return;
        }

        this.matdialogRef.close(this.detailForm.value);
    }

}
