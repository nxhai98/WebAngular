    import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
    import {Comment} from '../_models/Comment';
    import {AuthenticationService} from '../_servises/authentication.service';
    import {UserService} from '../_servises/user.service';

    @Component({
    selector: 'app-rep-comment',
    templateUrl: './rep-comment.component.html',
    styleUrls: ['./rep-comment.component.css']
    })
    export class RepCommentComponent implements OnInit {

        constructor(
            private auth: AuthenticationService,
            private userService: UserService,
        ) { }
        @Input() parentId;
        @Input() newsId;
        @Output() onSubmit = new EventEmitter();
        ngOnInit() {
        }

        commentContent;

        postComment(){
            console.log(this.commentContent);
            if(!this.commentContent){
                return;
            }
            let tempComment = new Comment;
            tempComment.content = this.commentContent;
            tempComment.userId = this.auth.currentUserValue.id;
            tempComment.newsId = this.newsId;
            if(this.parentId){
                tempComment.parentId = this.parentId;
            }
            this.userService.addComment(tempComment).subscribe(data => {
                this.onSubmit.emit();
            })
        }

    }
