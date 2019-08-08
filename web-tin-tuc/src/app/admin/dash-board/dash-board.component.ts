    import { Component, OnInit } from '@angular/core';
    import {AdminService} from '../_services/admin.service';

    @Component({
    selector: 'app-dash-board',
    templateUrl: './dash-board.component.html',
    styleUrls: ['./dash-board.component.css']
    })
    export class DashBoardComponent implements OnInit {

        isAccManageClick = false;
        isNewsManagerClick = false;
        isCatalogManagerClick = false;

        constructor(
            private admin : AdminService,
        ) { }

        ngOnInit() {
        }


        accManageChoise(){
            this.isCatalogManagerClick = false;
            this.isNewsManagerClick = false;
            this.isAccManageClick = true;            
        }

        newManagerClick(){
            this.isCatalogManagerClick = false;
            this.isAccManageClick = false;
            this.isNewsManagerClick = true;
        }

        catalogManagerClick(){
            this.isCatalogManagerClick = true;
            this.isAccManageClick = false;
            this.isNewsManagerClick = false;
        }

        onReset(){
            this.isAccManageClick = false;
            this.isNewsManagerClick = false;
            this.isCatalogManagerClick = false;
    
        }
    }
