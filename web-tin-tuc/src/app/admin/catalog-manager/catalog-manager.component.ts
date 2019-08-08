    import { Component, OnInit } from '@angular/core';
    import {AdminService} from '../_services/admin.service';
    import { Catalog } from 'src/app/_models/Catalog';
    import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CatalogAddComponent } from '../catalog-add/catalog-add.component';
import { CatalogDetailComponent } from '../catalog-detail/catalog-detail.component';


    @Component({
        selector: 'app-catalog-manager',
        templateUrl: './catalog-manager.component.html',
        styleUrls: ['./catalog-manager.component.css']
    })
    export class CatalogManagerComponent implements OnInit {

        listCatalog;
        searchChar = '';
        constructor(
            private adminService: AdminService,
            private dialog: MatDialog,
        ) { }

        ngOnInit() {
            this.adminService.getListCatalog().subscribe(data => {
                this.listCatalog = data;
            });
        }

        openAddDialog(){
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '600px';

            const catalogRef = this.dialog.open(CatalogAddComponent, dialogConfig);

            catalogRef.afterClosed().subscribe(result =>{
                if(result){
                    if(result.parentId == '-1'){
                        result.parentId = null;
                    }
                    this.adminService.addCatalog(result).subscribe(data => {
                        this.adminService.getListCatalog().subscribe(list =>{
                            this.listCatalog = list;
                        })
                    })
                }
                
            })
        }

        openDetailDialog(catalog){
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '600px';
            dialogConfig.data = catalog;

            const catalogRef = this.dialog.open(CatalogDetailComponent,dialogConfig);

            catalogRef.afterClosed().subscribe(result => {
                if(result){
                    this.adminService.updateCatalog(catalog.id, result).subscribe(data=>{
                    this.adminService.getListCatalog().subscribe(list=>{
                        this.listCatalog = list;
                        })
                    })
                }
                
            })
        }

        onDelete(catalog: Catalog){
            if(confirm("Are you sure to delete catalog: " + catalog.name)){
                this.adminService.removeCatalog(catalog.id).subscribe(data =>{
                    this.adminService.getListCatalog().subscribe(list => {
                        this.listCatalog = list;
                    })
                });
            }
        }
        isSearch = false;
        search(){
            if(this.searchChar != ''){
                this.isSearch = true;
                this.adminService.searchCatalog(this.searchChar).subscribe(list => {
                    this.listCatalog = list;
                })
            }
        }
        cancel(){
            this.isSearch = false;
            this.searchChar = '';
            this.adminService.getListCatalog().subscribe(list => {
                this.listCatalog = list;
            })
        }

    }
