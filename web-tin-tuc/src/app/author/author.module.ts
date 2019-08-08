    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { NewManagerForAuthorComponent } from './new-manager-for-author/new-manager-for-author.component';
    import { NewDetailComponent } from './new-detail/new-detail.component';
    import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
    import {ReactiveFormsModule} from '@angular/forms';
    import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    import { OverlayModule } from '@angular/cdk/overlay';
import { NewsAddComponent } from './news-add/news-add.component';


    @NgModule({
    declarations: [
        NewDetailComponent,
        NewManagerForAuthorComponent,
        NewsAddComponent,
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatDialogModule,
        OverlayModule,
        ReactiveFormsModule,
    ],
    providers: [
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
    ],
    entryComponents: [
        NewDetailComponent,
        NewsAddComponent,
    ]
    })
    export class AuthorModule { }
