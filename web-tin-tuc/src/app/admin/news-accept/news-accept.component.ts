import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminService } from '../_services/admin.service';
import { NewsDetailComponent } from '../news-detail/news-detail.component';
import { AddNewsComponent } from '../add-news/add-news.component';

@Component({
    selector: 'app-news-accept',
    templateUrl: './news-accept.component.html',
    styleUrls: ['./news-accept.component.css']
})
export class NewsAcceptComponent implements OnInit {

    listNews;
    currentPage = 1;
    pageDisplay: number[] = [];
    pageCount;
    searchChar;
    isSearch = false;

    constructor(
        private adminService: AdminService,
        private dialog: MatDialog,
    ) { }

    ngOnInit() {
        this.adminService.getListNews(this.currentPage,0).subscribe(list => {
            this.listNews = list;
        });
        this.adminService.getPageCount(0).subscribe(count => {
            this.pageCount = count;
            for (let i = 1; i <= this.pageCount; i++) {
                this.pageDisplay.push(i);
            }
        });
    }

    onAccept(news) {

    }

    onDeny() {

    }

    onOpenNewsDetailDialog(news) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '1000px';
        let dialogRef;

        this.adminService.getNewsById(news.id).subscribe(data => {
            dialogConfig.data = data[0];
            dialogRef = this.dialog.open(NewsDetailComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.adminService.updateNews(data[0].id, result).subscribe(res => {
                        this.onReset();
                    });
                }
            });

        });
    }


    loadPage(page) {
        this.currentPage = page;
        this.adminService.getListNews(page).subscribe(list => {
            this.listNews = list;
        });
    }

    onReset() {
        this.adminService.getListNews(this.currentPage).subscribe(list => {
            this.listNews = list;
        });
        this.pageDisplay = [];
        this.isSearch = false;
        this.searchChar = '';
        this.adminService.getPageCount().subscribe(count => {
            this.pageCount = count;
            for (let i = 1; i <= this.pageCount; i++) {
                this.pageDisplay.push(i);
            }
        });
    }

    search() {
        if (this.searchChar !== '') {
            this.isSearch = true;
            this.adminService.searchNew(this.searchChar).subscribe(list => {
                this.listNews = list;
            });
        } else {
            this.onReset();
        }
    }

}
