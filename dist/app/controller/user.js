"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../services/user"));
const post_1 = __importDefault(require("../services/post"));
const comment_1 = __importDefault(require("../services/comment"));
// import { CodeGenerator } from "../../core/utils/generateCodes";
const argon2_1 = __importDefault(require("argon2"));
const httpStatusCodes_1 = require("../../core/utils/httpStatusCodes");
const mailerService_1 = require("../services/mailerService");
const sessionService_1 = require("../services/sessionService");
class UserController {
    constructor() {
        this.userService = new user_1.default();
        this.postService = new post_1.default();
        this.commentService = new comment_1.default();
        this.sessionService = new sessionService_1.SessionServices();
        // private codeGenerator = new CodeGenerator();
        // User registration with email verification
        this.registerUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, email, country, password } = req.body;
                const existingUser = yield this.userService.getUserByEmail(email);
                if (existingUser) {
                    res.status(httpStatusCodes_1.HttpStatusCodes.CONFLICT).json({ message: "User already exists" });
                    return;
                }
                const hashedPassword = yield argon2_1.default.hash(password);
                const newUser = {
                    firstName,
                    lastName,
                    email,
                    country,
                    password: hashedPassword,
                };
                const user = yield this.userService.createUser(newUser);
                yield new mailerService_1.MailerService().sendConfirmationCode(user.email, user.confirmationToken, user.firstName);
                res.status(httpStatusCodes_1.HttpStatusCodes.CREATED).json({
                    message: "User registered successfully. Check your email for verification code",
                });
                return;
            }
            catch (error) {
                next(error);
            }
        });
        this.loginUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.userService.getUserByEmail(email);
                if (!user) {
                    res.status(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND).send({ message: "USer not found" });
                    return;
                }
                if (user.isConfirmed === false) {
                    res.status(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST).send({ message: "User not verified" });
                    return;
                }
                const verifyPassword = yield argon2_1.default.verify(user.password, password);
                if (!verifyPassword) {
                    res.status(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST).send({ message: "Invalid password" });
                    return;
                }
                const token = this.sessionService.generateToken({ email: user.email, role: 'USER' });
                res.status(httpStatusCodes_1.HttpStatusCodes.OK).send({ token, message: "User logged in successfully" });
                return;
            }
            catch (error) {
                next(error);
            }
        });
        // User verifies email
        this.verifyUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, verificationCode } = req.body;
                const user = yield this.userService.getUserByEmail(email);
                if (!user) {
                    res.status(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND).json({ message: "User not found" });
                    return;
                }
                if (user.isConfirmed) {
                    res.status(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST).json({ message: "User already verified" });
                    return;
                }
                if (user.confirmationToken !== verificationCode) {
                    res.status(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED).json({ message: "Invalid verification code" });
                    return;
                }
                yield this.userService.confirmEmail(email);
                res.status(httpStatusCodes_1.HttpStatusCodes.OK).json({ message: "User verified successfully" });
                return;
            }
            catch (error) {
                next(error);
            }
        });
        // User creates a post
        this.createPost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content, email } = req.body;
                const userId = req.user.id;
                console.log(req.user);
                const newPost = {
                    userId: userId,
                    title,
                    content
                };
                const post = yield this.postService.createPost(newPost);
                res.status(httpStatusCodes_1.HttpStatusCodes.CREATED).json({ message: "Post created successfully", post });
                return;
            }
            catch (error) {
                next(error);
            }
        });
        // User edits a post
        this.editPost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId } = req.params;
                const { title, content } = req.body;
                const userId = req.user.id;
                const updatedPost = yield this.postService.updatePost(postId, userId, { title, content });
                if (!updatedPost) {
                    res.status(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND).json({ message: "Post not found or unauthorized" });
                    return;
                }
                res.status(httpStatusCodes_1.HttpStatusCodes.OK).json({ message: "Post updated successfully", updatedPost });
                return;
            }
            catch (error) {
                next(error);
            }
        });
        // User deletes a post
        this.deletePost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId } = req.params;
                const userId = req.user.id;
                const userPost = yield this.postService.getSinglePost(postId, userId);
                if (!userPost) {
                    res.status(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND).json({ message: "Post not found or unauthorized" });
                    return;
                }
                yield this.postService.deletePost(postId);
                res.status(httpStatusCodes_1.HttpStatusCodes.OK).json({ message: "Post deleted successfully" });
                return;
            }
            catch (error) {
                next(error);
            }
        });
        // Other users comment on a post
        this.commentOnPost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId } = req.params;
                const { content } = req.body;
                const userId = req.user.id;
                const comment = yield this.commentService.addComment({ content, postId, userId });
                res.status(httpStatusCodes_1.HttpStatusCodes.CREATED).json({ message: "Comment added successfully", comment });
                return;
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllPosts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.postService.getPosts();
                const commentPromise = posts.map((post) => __awaiter(this, void 0, void 0, function* () {
                    return yield this.commentService.getCommentsByPostId(post.id);
                }));
                const comments = yield Promise.all(commentPromise);
                posts.forEach((post, index) => {
                    post.comments = comments[index];
                });
                res.status(httpStatusCodes_1.HttpStatusCodes.OK).json({ posts });
                return;
            }
            catch (error) {
                next(error);
            }
        });
        this.getUserPosts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const posts = yield this.postService.getUserPosts(userId);
                const commentPromise = posts.map((post) => __awaiter(this, void 0, void 0, function* () {
                    return yield this.commentService.getCommentsByPostId(post.id);
                }));
                const comments = yield Promise.all(commentPromise);
                posts.forEach((post, index) => {
                    post.comments = comments[index];
                });
                res.status(httpStatusCodes_1.HttpStatusCodes.OK).json({ posts });
                return;
            }
            catch (error) {
                next(error);
            }
        });
        this.getSinglePost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId } = req.params;
                const userId = req.user.id;
                console.log(postId, userId, req.user);
                const post = yield this.postService.getSinglePost(postId, userId);
                if (!post) {
                    res.status(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND).json({ message: "Post not found" });
                    return;
                }
                const comments = yield this.commentService.getCommentsByPostId(postId);
                post.comments = comments;
                res.status(httpStatusCodes_1.HttpStatusCodes.OK).json({ post });
                return;
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.js.map