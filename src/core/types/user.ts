import { Post } from "./post";

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    password: string;
    isConfirmed: boolean; 
    confirmationToken: string | null; 
    createdAt: Date;
    updatedAt: Date;
    posts?: Post[]; 
}



export interface UserSignupInput {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    password: string;
}

export interface UserSignupResponse {
    message: string;
    success: boolean;
}
