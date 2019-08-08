    import { Component, OnInit } from '@angular/core';
    import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
    import {MatDialogRef} from '@angular/material/dialog';
    import {FileUploader} from 'ng2-file-upload';

    import {UserService} from 'src/app/_servises/user.service';
    import {AuthenticationService} from 'src/app/_servises/authentication.service';
    import {AuthorServiceService} from '../_service/author-service.service';
    import { News } from 'src/app/_models/News';
    import { Catalog } from 'src/app/_models/Catalog';

    @Component({
        selector: 'app-news-add',
        templateUrl: './news-add.component.html',
        styleUrls: ['./news-add.component.css']
    })
    export class NewsAddComponent implements OnInit {

        constructor(
            private dialogRef: MatDialogRef<NewsAddComponent>,
            private formBuilder: FormBuilder,
            private userService: UserService,
            private auth: AuthenticationService,
            private authorService: AuthorServiceService,
        ) { }

        addForm: FormGroup;
        news: News;
        submitted = false;
        listCatalog: Catalog[];

        ngOnInit() {
            this.userService.getListCatalog().subscribe(list => {
                this.listCatalog = list;
            })
            this.addForm = this.formBuilder.group({
                title:['', Validators.required],
                description:['', Validators.required],
                catalogId:['', Validators.required],
                content:['', Validators.required],
            })
        }

        public get f(){return this.addForm.controls}

        close(){
            this.dialogRef.close();
        }

        add(data){
            let news = new News;
            news.author = this.auth.currentUserValue.id;
            news.catalogId = data.catalogId;
            news.content = data.content;
            news.description = data.description;
            news.status = 0;
            news.title = data.title;
            this.submitted = true;
            if(this.addForm.invalid){
                return;
            }else{
                this.authorService.addNews(news).subscribe(result => {
                    this.dialogRef.close();
                })
            }
        }

    }
