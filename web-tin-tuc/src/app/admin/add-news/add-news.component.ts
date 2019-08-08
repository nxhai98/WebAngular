    import { Component, OnInit, Input, Inject } from '@angular/core';
    import {FormBuilder, FormGroup, Validators} from '@angular/forms';
    import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
    import {AdminService} from '../_services/admin.service';
    import { News } from 'src/app/_models/News';
    import { Catalog } from 'src/app/_models/Catalog';

    import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

    const URL = 'http://localhost:3000/imgs/upload/';


    @Component({
        selector: 'app-add-news',
        templateUrl: './add-news.component.html',
        styleUrls: ['./add-news.component.css']
    })
    export class AddNewsComponent implements OnInit {

        addForm: FormGroup;
        catalogList;
        listAuthor;
        fileData = null;
        

        constructor(
            private formBuilder: FormBuilder,
            private adminSevice: AdminService,
            public matdialogRef: MatDialogRef<AddNewsComponent>,
            @Inject(MAT_DIALOG_DATA) public data: News,
            
        ) { }

        public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });


        ngOnInit() {
            this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
            this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                console.log('ImageUpload:uploaded:', item, status, response);
                alert('File uploaded successfully');
            };

            this.adminSevice.getListCatalog().subscribe(data=>{
                this.catalogList = data;
            });
            this.adminSevice.getAuthor().subscribe(data => {
                this.listAuthor = data;
            });
            this.addForm = this.formBuilder.group({
                title: ['', Validators.required],
                author: ['', Validators.required],
                catalogId: ['', Validators.required],
                description: [''],
                content: [''],
            });
        }

        get f(){
            return this.addForm.controls;
        }

        close(){
            this.matdialogRef.close();
        }

        onChangeFile(file){
            console.log(file);
            
            this.fileData = file;
        }

        submitted = false;

        onSubmit(){
            this.submitted = true;

            if(this.addForm.invalid){
                return;
            }
            this.adminSevice.addNews(this.addForm.value).subscribe(data =>{
                console.log(data);
                this.uploader.setOptions({url: URL + data});
                this.uploader.uploadAll();
            })

           
            this.matdialogRef.close();
            

        }


    }
