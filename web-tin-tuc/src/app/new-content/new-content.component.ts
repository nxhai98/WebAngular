    import { Component, OnInit , Input, Inject} from '@angular/core';
    import {ActivatedRoute} from '@angular/router';

    import {UserService} from '../_servises/user.service';
    import {AuthenticationService} from '../_servises/authentication.service';
    import { News } from '../_models/News';
    import {Comment, CommentTree} from '../_models/Comment';
    import {DOCUMENT} from '@angular/common';

    @Component({
        selector: 'app-new-content',
        templateUrl: './new-content.component.html',
        styleUrls: ['./new-content.component.css']
    })
    export class NewContentComponent implements OnInit {

        constructor(
            private route: ActivatedRoute,
            private userSevice: UserService,
            private auth: AuthenticationService,
        ) {}
        
        imgUrl = 'http://localhost:3000/imgs/'

        news: News = new News;

        listComment: Comment[];
        commentTree: CommentTree[] = [];
        
        ngOnInit() {
            this.route.params.subscribe(params =>{
                this.userSevice.getNewsById(params.id).subscribe(data =>{
                    this.news = data[0];
                });
                this.userSevice.getListComment(params.id).subscribe(list =>{
                    this.listComment = list;
                    this.listComment.forEach(comment => {
                        if(comment.parentId == null){
                            this.commentTree.push({node: comment, child: []});
                        }
                    })
                    this.listComment.forEach(comment => {
                        this.commentTree.forEach(family => {
                            if(comment.parentId == family.node.id){
                                family.child.push(comment);
                            }
                        });
                    });
                    console.log(this.commentTree);
                });
            });  
        }

        onReset(){
            this.route.params.subscribe(params =>{
                this.userSevice.getListComment(params.id).subscribe(list =>{
                    this.listComment = list;
                    this.listComment.forEach(comment => {
                        if(comment.parentId == null){
                            this.commentTree.push({node: comment, child:[]});
                        }
                    });
                    this.listComment.forEach(comment => {
                        this.commentTree.forEach(family => {
                            if(comment.parentId == family.node.id){
                                family.child.push(comment);
                            }
                        });
                    });
                    console.log(this.commentTree);
                });
            });  
            this.commentContent = '';
            this.commentTree = []
        }
        commentContent: string = '';
        postComment(parentId?){
            console.log(this.commentContent);
            if(!this.commentContent){
                return;
            }
            let tempComment = new Comment;
            tempComment.content = this.commentContent;
            tempComment.userId = this.auth.currentUserValue.id;
            tempComment.newsId = this.news.id;
            if(parentId){
                tempComment.parentId = parentId;
            }
            this.userSevice.addComment(tempComment).subscribe(data => {
                this.onReset();
            })
        }

    }
