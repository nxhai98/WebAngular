    import { Component, OnInit } from '@angular/core';
    import {UserService} from '../_servises/user.service';
    import {CatalogFamily, Catalog} from '../_models/Catalog';
import { templateJitUrl } from '@angular/compiler';

    @Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    })
    export class HomeComponent implements OnInit {
        imgUrl = 'http://localhost:3000/imgs/'
        newUrl = 'http://localhost:3000/news/id/'
        currentPage = 1;
        listNews;
        selectedNews;
        pageCount: number;
        pageDisplay: number[] = [];
        constructor(
            private userService: UserService,
        ) {}

        ngOnInit() {
            this.userService.getNewsByPage(this.currentPage).subscribe(list=>{
                this.listNews = list;
            });
            this.userService.getMaxPage().subscribe(pageCount =>{
                this.pageCount = pageCount;
                for(let i = 1; i<= pageCount; i++){
                    this.pageDisplay.push(i);
                }
            });
        }


        loadPage(page){
            this.currentPage = page;
            this.userService.getNewsByPage(page).subscribe(data => {
                this.listNews = data;
            })
        }

    }
