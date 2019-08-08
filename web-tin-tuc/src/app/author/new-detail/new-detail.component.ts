    import { Component, OnInit, Inject } from '@angular/core';
    import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
    import {FormBuilder, FormGroup, Validators} from '@angular/forms';
    import { News } from 'src/app/_models/News';
    import {UserService} from '../../_servises/user.service';
    import {AuthorServiceService} from '../_service/author-service.service';

    const URL = 'http://localhost:3000/imgs/upload/';


    @Component({
        selector: 'app-new-detail',
        templateUrl: './new-detail.component.html',
        styleUrls: ['./new-detail.component.css']
    })
    export class NewDetailComponent implements OnInit {

        addForm: FormGroup;
        listCatalog;

        constructor(
            private formBuilder: FormBuilder,
            public matDialogRef: MatDialogRef<NewDetailComponent>,
            private userService: UserService,
            private authorService: AuthorServiceService,
            @Inject(MAT_DIALOG_DATA) public data: News,
        ) { }

        ngOnInit() {
            this.userService.getListCatalog().subscribe(list => {
                this.listCatalog = list;
            });
            this.addForm = this.formBuilder.group({
                title: [this.data.title, Validators.required],
                author: [this.data.author, Validators.required],
                catalogId: [this.data.catalogId, Validators.required],
                description: [this.data.description, Validators.required],
                content: [this.data.content, Validators.required],
            });
        }

        close(){
            this.matDialogRef.close();
        }

        get f(){return this.addForm.controls}

        submitted = false;

        submit(data){
            this.submitted = true;
            if(this.addForm.invalid){
                return;
            }
            this.authorService.addNews(data).subscribe(data => {
            })
        }

        onLoading = false;

        onSubmit(){
            this.onLoading = true;
            this.authorService.updateNews(this.data.id, this.addForm.value).subscribe(data => {
                this.onLoading = false;
                this.matDialogRef.close();
            })
        }
    }