    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import {ReactiveFormsModule, FormsModule} from '@angular/forms';
    import {HttpClientModule} from '@angular/common/http';
    import {MatDialogModule} from '@angular/material/dialog';

    import { AppComponent } from './app.component';
    import { HomeComponent } from './home/home.component';
    import {AdminModule} from './admin/admin.module';
    import {AuthorModule} from './author/author.module';
    import { LoginComponent } from './login/login.component';
    import {routing} from './app.routing';
    import { NewContentComponent } from './new-content/new-content.component';
    import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
    import { ListNewsViaCatalogComponent } from './list-news-via-catalog/list-news-via-catalog.component';
    import { RepCommentComponent } from './rep-comment/rep-comment.component';
    import { ProfileComponent } from './profile/profile.component';
    import { ChangePasswdComponent } from './change-passwd/change-passwd.component';

    @NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        NewContentComponent,
        ListNewsViaCatalogComponent,
        RepCommentComponent,
        ProfileComponent,
        ChangePasswdComponent,
    ],
    imports: [
        BrowserModule,
        AdminModule,
        AuthorModule,
        routing,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        MatDialogModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
    ],
    entryComponents: [
        ProfileComponent,
        ChangePasswdComponent,
    ]
    })
    export class AppModule { }
