import { PostComment } from "./comment";

export interface Post {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    comments?: PostComment[]; 
}

export interface PostInput {
    title: string;
    content: string;
}

export interface PostResponse {
    id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
