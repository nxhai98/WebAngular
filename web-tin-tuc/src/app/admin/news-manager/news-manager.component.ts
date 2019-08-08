import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminService } from '../_services/admin.service';
import { NewsDetailComponent } from '../news-detail/news-detail.component';
import { AddNewsComponent } from '../add-news/add-news.component';

@Component({
    selector: 'app-news-manager',
    templateUrl: './news-manager.component.html',
    styleUrls: ['./news-manager.component.css']
})
export class NewsManagerComponent implements OnInit {

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
        this.adminService.getListNews(this.currentPage).subscribe(list => {
            this.listNews = list;
        });
        this.adminService.getPageCount(1).subscribe(
            count => {
                this.pageCount = count;
                for (let i = 1; i <= this.pageCount; i++) {
                    this.pageDisplay.push(i);
                }
            },
            error => {
                console.log(error);
            });
    }

    onDelete(news) {
        if (confirm('Are you sure to delete new has name: ' + news.title)) {
            this.adminService.removeNews(news.id).subscribe(data => {
                this.adminService.getListNews(this.currentPage).subscribe(list => {
                    this.listNews = list;
                });
            });
        }
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

    onOpenAddNewsDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '1000px';

        const dialogRef = this.dialog.open(AddNewsComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            this.onReset();
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
        // tslint:disable-next-line: deprecation
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
