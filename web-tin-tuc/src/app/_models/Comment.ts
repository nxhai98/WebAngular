export class Comment{
    id?: number;
    newsId?: number;
    userName: string;
    userId: number;
    content: string;
    createAt: Date;
    parentId: number;
}

export class CommentTree{
    node: Comment;
    child: Comment[];
}