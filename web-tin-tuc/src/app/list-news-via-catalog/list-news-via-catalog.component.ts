import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_servises/user.service';

@Component({
    selector: 'app-list-news-via-catalog',
    templateUrl: './list-news-via-catalog.component.html',
    styleUrls: ['./list-news-via-catalog.component.css']
})
export class ListNewsViaCatalogComponent implements OnInit {

    imgUrl = 'http://localhost:3000/imgs/';
    newUrl = 'http://localhost:3000/news/id/';
    currentPage = 1;
    listNews;
    selectedNews;
    pageCount: number;
    pageDisplay: number[] = [];
    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.userService.getNewsByCatalog(this.currentPage, params.catalogId).subscribe(list => {
                this.listNews = list;
            });
            this.userService.getNewCountByCatalog(params.catalogId).subscribe(pageCount => {
                if (pageCount === 0) {
                }
                this.pageCount = pageCount;
                this.pageDisplay = [];
                for (let i = 1; i <= pageCount; i++) {
                    this.pageDisplay.push(i);
                }
            });
        });
    }


    loadPage(page) {
        this.currentPage = page;
        this.userService.getNewsByPage(page).subscribe(data => {
            this.listNews = data;
        });
    }


}
