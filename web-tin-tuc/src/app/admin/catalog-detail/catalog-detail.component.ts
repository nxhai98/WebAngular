    import { Component, OnInit, Inject } from '@angular/core';
    import {FormBuilder, FormGroup, Validators} from '@angular/forms';
    import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
    import {AdminService} from '../_services/admin.service';
    import { Catalog } from 'src/app/_models/Catalog';

    @Component({
        selector: 'app-catalog-detail',
        templateUrl: './catalog-detail.component.html',
        styleUrls: ['./catalog-detail.component.css']
    })
    export class CatalogDetailComponent implements OnInit {

        detailForm: FormGroup;
        listCatalog;
        constructor(
            private formBuilder: FormBuilder,
            private adminSevice: AdminService,
            public matdialogRef: MatDialogRef<CatalogDetailComponent>,
            @Inject(MAT_DIALOG_DATA) public data: Catalog,
        ) { }

        ngOnInit() {
            this.adminSevice.getListCatalog().subscribe(data=>{
                this.listCatalog = data;
            });
            this.detailForm = this.formBuilder.group({
                name: [this.data.name, Validators.required],
                description: [this.data.description, Validators.required],
                parentId: [this.data.parentId]
            })
        }

        get f(){return this.detailForm.controls}

        close(){
            this.matdialogRef.close();
        }

        submitted = false;
        update(){
            this.submitted = true;
            if(this.detailForm.invalid){
                return;
            }
            this.matdialogRef.close(this.detailForm.value);
        }

    }
