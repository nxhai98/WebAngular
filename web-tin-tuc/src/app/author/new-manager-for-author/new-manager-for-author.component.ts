    import { Component, OnInit } from '@angular/core';
    import { News } from '../../_models/News';
    import {UserService} from '../../_servises/user.service';
    import {AuthorServiceService} from '../_service/author-service.service';
    import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
    import { NewDetailComponent } from '../new-detail/new-detail.component';
    import { NewsAddComponent } from '../news-add/news-add.component';

    @Component({
        selector: 'app-new-manager-for-author',
        templateUrl: './new-manager-for-author.component.html',
        styleUrls: ['./new-manager-for-author.component.css']
    })
    export class NewManagerForAuthorComponent implements OnInit {
        listNews;
        constructor(
            private userService :UserService,
            private authorSevice :AuthorServiceService,
            private dialog: MatDialog,
        ) { }

        ngOnInit() {
            this.userService.getlistNews().subscribe(list => {
                this.listNews = list;
            });
        }

        onOpenNewsDetailDialog(id){
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '1000px';
            var dialogRef;
            this.userService.getNewsById(id).subscribe(data => {
                dialogConfig.data = data[0];
                dialogRef = this.dialog.open(NewDetailComponent, dialogConfig);
                dialogRef.afterClosed().subscribe(result => {
                    this.ngOnInit();
                })
            })
            
        }

        onOpenNewsAddDialog(){
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '1000px';
            var dialogRef = this.dialog.open(NewsAddComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(result => {
                this.ngOnInit();
            })
        }

        onDelete(id){
            this.authorSevice.removeNews(id).subscribe(result => {
                this.ngOnInit();
            })
        }

    }
