    import { Component, OnInit, Inject } from '@angular/core';
    import {FormBuilder, FormGroup, Validators} from '@angular/forms';
    import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
    import {AdminService} from '../_services/admin.service';
    import { Catalog } from 'src/app/_models/Catalog';

    @Component({
        selector: 'app-catalog-add',
        templateUrl: './catalog-add.component.html',
        styleUrls: ['./catalog-add.component.css']
    })
    export class CatalogAddComponent implements OnInit {
        listCatalog;
        addForm: FormGroup;
        constructor(
            private formBuilder: FormBuilder,
            private adminSevice: AdminService,
            public matdialogRef: MatDialogRef<CatalogAddComponent>,
            //@Inject(MAT_DIALOG_DATA) public data: Catalog,
        ) { }

        ngOnInit() {
            this.adminSevice.getListRootCatalog().subscribe(data =>{
                this.listCatalog = data;
            });
            this.addForm = this.formBuilder.group({
                name: ['', Validators.required],
                description: ['', Validators.required],
                parentId: ['-1'],
            })
        }

        get f(){return this.addForm.controls}

        close(){
            this.matdialogRef.close();
        }

        submitted = false;

        save(){
            this.submitted = true;
            if(this.addForm.invalid){
                return;
            }
            this.matdialogRef.close(this.addForm.value);
        }

    }
