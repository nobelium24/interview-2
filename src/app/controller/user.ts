import { Request, Response, NextFunction } from "express";
import UserService from "../services/user";
import PostService from "../services/post";
import CommentService from "../services/comment";
// import { CodeGenerator } from "../../core/utils/generateCodes";
import argon2 from "argon2";
import { HttpStatusCodes } from "../../core/utils/httpStatusCodes";
import { User } from "../../core/types/user";
import { MailerService } from "../services/mailerService";
import { Post } from "../../core/types/post";
import { SessionServices } from "../services/sessionService";

export class UserController {
    private userService = new UserService();
    private postService = new PostService();
    private commentService = new CommentService();
    private sessionService = new SessionServices()
    // private codeGenerator = new CodeGenerator();

    // User registration with email verification
    registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { firstName, lastName, email, country, password } = req.body;

            const existingUser = await this.userService.getUserByEmail(email);
            if (existingUser) {
                res.status(HttpStatusCodes.CONFLICT).json({ message: "User already exists" });
                return;
            }

            const hashedPassword = await argon2.hash(password);

            const newUser: Partial<User> = {
                firstName,
                lastName,
                email,
                country,
                password: hashedPassword,
            };

            const user = await this.userService.createUser(newUser);

            await new MailerService().sendConfirmationCode(user.email, user.confirmationToken!, user.firstName);

            res.status(HttpStatusCodes.CREATED).json({
                message: "User registered successfully. Check your email for verification code",
            });
            return;
        } catch (error) {
            next(error);
        }
    };

    loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, password } = req.body;
            const user = await this.userService.getUserByEmail(email)
            if (!user)  {
                res.status(HttpStatusCodes.NOT_FOUND).send({ message: "USer not found" })
                return
            }
            if (user.isConfirmed === false) {
                res.status(HttpStatusCodes.BAD_REQUEST).send({ message: "User not verified" });
                return;

            }
            const verifyPassword = await argon2.verify(user.password, password)
            if (!verifyPassword) {
                res.status(HttpStatusCodes.BAD_REQUEST).send({ message: "Invalid password" });
                return;
            }
            const token = this.sessionService.generateToken({ email: user.email, role: 'USER' });

            res.status(HttpStatusCodes.OK).send({ token, message: "User logged in successfully" });
            return
        } catch (error) {
            next(error);
        }
    }

    // User verifies email
    verifyUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, verificationCode } = req.body;

            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ message: "User not found" });
                return;
            }

            if (user.isConfirmed) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({ message: "User already verified" });
                return;
            }

            if (user.confirmationToken !== verificationCode) {
                res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: "Invalid verification code" });
                return;
            }
            await this.userService.confirmEmail(email);
            res.status(HttpStatusCodes.OK).json({ message: "User verified successfully" });
            return;
        } catch (error) {
            next(error);
        }
    };

    // User creates a post
    createPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { title, content, email } = req.body;
            const userId = req.user.id;
            console.log(req.user)

            const newPost: Partial<Post> = {
                userId: userId,
                title,
                content
            }
            const post = await this.postService.createPost(newPost);
            res.status(HttpStatusCodes.CREATED).json({ message: "Post created successfully", post });
            return;
        } catch (error) {
            next(error);
        }
    };

    // User edits a post
    editPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { postId } = req.params;
            const { title, content } = req.body;
            const userId = req.user.id;


            const updatedPost = await this.postService.updatePost(postId, userId, { title, content });
            if (!updatedPost) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ message: "Post not found or unauthorized" });
                return;
            }

            res.status(HttpStatusCodes.OK).json({ message: "Post updated successfully", updatedPost });
            return;
        } catch (error) {
            next(error);
        }
    };

    // User deletes a post
    deletePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { postId } = req.params;
            const userId = req.user.id;
            const userPost = await this.postService.getSinglePost(postId, userId);
            if (!userPost) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ message: "Post not found or unauthorized" });
                return;
            }
            await this.postService.deletePost(postId);
            res.status(HttpStatusCodes.OK).json({ message: "Post deleted successfully" });
            return;
        } catch (error) {
            next(error);
        }
    };

    // Other users comment on a post
    commentOnPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { postId } = req.params;
            const { content } = req.body;
            const userId = req.user.id;

            const comment = await this.commentService.addComment({ content, postId, userId });
            res.status(HttpStatusCodes.CREATED).json({ message: "Comment added successfully", comment });
            return;
        } catch (error) {
            next(error);
        }
    };

    getAllPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const posts = await this.postService.getPosts();
            const commentPromise = posts.map(async (post) => {
                return await this.commentService.getCommentsByPostId(post.id);
            });
            const comments = await Promise.all(commentPromise);
            posts.forEach((post, index) => {
                post.comments = comments[index];
            });
            res.status(HttpStatusCodes.OK).json({ posts });
            return;
        } catch (error) {
            next(error);
        }
    }

    getUserPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user.id;
            const posts = await this.postService.getUserPosts(userId);
            const commentPromise = posts.map(async (post) => {
                return await this.commentService.getCommentsByPostId(post.id);
            });
            const comments = await Promise.all(commentPromise);
            posts.forEach((post, index) => {
                post.comments = comments[index];
            });
            res.status(HttpStatusCodes.OK).json({ posts });
            return;
        } catch (error) {
            next(error);
        }
    }

    getSinglePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { postId } = req.params;
            const userId = req.user.id;
            console.log(postId, userId, req.user)
            const post = await this.postService.getSinglePost(postId, userId);
            if (!post) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ message: "Post not found" });
                return;
            }
            const comments = await this.commentService.getCommentsByPostId(postId);
            post.comments = comments;
            res.status(HttpStatusCodes.OK).json({ post });
            return;
        } catch (error) {
            next(error);
        }
    }
}
