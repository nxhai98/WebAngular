import { user } from './User';

export class News{
    id: number;
    title: string;
    catalogId: number;
    description?: string;
    author: number;
    createAt: Date;
    updateAt: Date;
    content?: string; 
    status?:number;
}