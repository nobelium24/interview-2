import { Request, Response, NextFunction } from "express";
import AdminService from "../services/admin";
import PostService from "../services/post";
import UserService from "../services/user";
import { HttpStatusCodes } from "../../core/utils/httpStatusCodes";
import argon2 from "argon2";
import { SessionServices } from "../services/sessionService";
import CommentService from "../services/comment";

export class AdminController {
    private adminService = new AdminService();
    private postService = new PostService();
    private userService = new UserService();
    private sessionService = new SessionServices();
    private commentService = new CommentService();
    
    createAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const authAdmin = req.admin;
            if (!authAdmin.isSuperAdmin) {
                res.status(HttpStatusCodes.FORBIDDEN).json({ message: "You are not authorized to perform this action" });
                return;
            }
            const { firstName, lastName, email, password } = req.body;

            const existingAdmin = await this.adminService.getAdminByEmail(email);
            if (existingAdmin) {
                res.status(HttpStatusCodes.CONFLICT).json({ message: "Admin already exists" });
                return;
            }

            const hashedPassword = await argon2.hash(password);

            const newAdmin = { firstName, lastName, email, password: hashedPassword };
            const admin = await this.adminService.addAdmin(newAdmin);

            res.status(HttpStatusCodes.CREATED).json({ message: "Admin created successfully", admin });
            return;
        } catch (error) {
            next(error);
        }
    };

    loginAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, password } = req.body;
            const admin = await this.adminService.getAdminByEmail(email);
            if (!admin) {
                res.status(HttpStatusCodes.NOT_FOUND).send({ message: "Admin not found" });
                return;
            }

            const verifyPassword = await argon2.verify(admin.password, password);
            if (!verifyPassword) {
                res.status(HttpStatusCodes.BAD_REQUEST).send({ message: "Invalid password" });
                return;
            }

            const token = this.sessionService.generateToken({ email: admin.email, role: 'ADMIN' });
            res.status(HttpStatusCodes.OK).json({ message: "Login successful", token });
            return;
        } catch (error) {
            next(error);
        }
    }

    deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { userId } = req.params;

            await this.userService.deleteUser(userId);
            res.status(HttpStatusCodes.OK).json({ message: "User deleted successfully" });
            return
        } catch (error) {
            next(error);
        }
    };

    deletePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { postId } = req.params;

            await this.postService.deletePost(postId);
            res.status(HttpStatusCodes.OK).json({ message: "Post deleted successfully" });
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
}
