    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import {RouterModule} from '@angular/router';
    import {ReactiveFormsModule, FormsModule} from '@angular/forms';
    import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
    import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
    import {OverlayModule} from '@angular/cdk/overlay';
    import {HttpClientModule} from '@angular/common/http';
    import {FileSelectDirective} from 'ng2-file-upload';

    import { NewsManagerComponent } from './news-manager/news-manager.component';
    import { UserManagerComponent } from './user-manager/user-manager.component';
    import { DashBoardComponent } from './dash-board/dash-board.component';
    import { AuthGuard } from '../_guards/auth.guard';
    import { Role } from '../_models/Role';
    import { AddUserComponent } from './add-user/add-user.component';
    import { EditUserComponent } from './edit-user/edit-user.component';
    import { NewsDetailComponent } from './news-detail/news-detail.component';
    import { AddNewsComponent } from './add-news/add-news.component';
    import { CatalogManagerComponent } from './catalog-manager/catalog-manager.component';
    import { CatalogDetailComponent } from './catalog-detail/catalog-detail.component';
    import { CatalogAddComponent } from './catalog-add/catalog-add.component';
import { NewsAcceptComponent } from './news-accept/news-accept.component';



    @NgModule({
    declarations: [
        NewsManagerComponent,
        UserManagerComponent, 
        DashBoardComponent, 
        AddUserComponent, 
        EditUserComponent, 
        NewsDetailComponent, 
        AddNewsComponent, 
        CatalogManagerComponent, 
        CatalogDetailComponent, 
        CatalogAddComponent,
        FileSelectDirective,
        NewsAcceptComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        OverlayModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forChild([
            {   path: 'admin/dashboard', 
                component: DashBoardComponent,
                canActivate: [AuthGuard],
                data: {roles: [Role.admin]},
            },
        ])
    ],
    providers: [
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
    ],
    entryComponents:[
        EditUserComponent, 
        AddUserComponent,
        NewsDetailComponent, 
        AddNewsComponent, 
        CatalogAddComponent, 
        CatalogDetailComponent],
    })
    export class AdminModule { }
