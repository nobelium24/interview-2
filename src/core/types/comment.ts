export interface PostComment {
    id: string;
    content: string;
    postId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface CommentInput {
    postId: string;
    content: string;
}

export interface CommentResponse {
    id: string;
    postId: string;
    userId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
