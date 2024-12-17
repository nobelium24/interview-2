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
exports.AdminController = void 0;
const admin_1 = __importDefault(require("../services/admin"));
const post_1 = __importDefault(require("../services/post"));
const user_1 = __importDefault(require("../services/user"));
const httpStatusCodes_1 = require("../../core/utils/httpStatusCodes");
const argon2_1 = __importDefault(require("argon2"));
const sessionService_1 = require("../services/sessionService");
const comment_1 = __importDefault(require("../services/comment"));
class AdminController {
    constructor() {
        this.adminService = new admin_1.default();
        this.postService = new post_1.default();
        this.userService = new user_1.default();
        this.sessionService = new sessionService_1.SessionServices();
        this.commentService = new comment_1.default();
        this.createAdmin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authAdmin = req.admin;
                if (!authAdmin.isSuperAdmin) {
                    res.status(httpStatusCodes_1.HttpStatusCodes.FORBIDDEN).json({ message: "You are not authorized to perform this action" });
                    return;
                }
                const { firstName, lastName, email, password } = req.body;
                const existingAdmin = yield this.adminService.getAdminByEmail(email);
                if (existingAdmin) {
                    res.status(httpStatusCodes_1.HttpStatusCodes.CONFLICT).json({ message: "Admin already exists" });
                    return;
                }
                const hashedPassword = yield argon2_1.default.hash(password);
                const newAdmin = { firstName, lastName, email, password: hashedPassword };
                const admin = yield this.adminService.addAdmin(newAdmin);
                res.status(httpStatusCodes_1.HttpStatusCodes.CREATED).json({ message: "Admin created successfully", admin });
                return;
            }
            catch (error) {
                next(error);
            }
        });
        this.loginAdmin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const admin = yield this.adminService.getAdminByEmail(email);
                if (!admin) {
                    res.status(httpStatusCodes_1.HttpStatusCodes.NOT_FOUND).send({ message: "Admin not found" });
                    return;
                }
                const verifyPassword = yield argon2_1.default.verify(admin.password, password);
                if (!verifyPassword) {
                    res.status(httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST).send({ message: "Invalid password" });
                    return;
                }
                const token = this.sessionService.generateToken({ email: admin.email, role: 'ADMIN' });
                res.status(httpStatusCodes_1.HttpStatusCodes.OK).json({ message: "Login successful", token });
                return;
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                yield this.userService.deleteUser(userId);
                res.status(httpStatusCodes_1.HttpStatusCodes.OK).json({ message: "User deleted successfully" });
                return;
            }
            catch (error) {
                next(error);
            }
        });
        this.deletePost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId } = req.params;
                yield this.postService.deletePost(postId);
                res.status(httpStatusCodes_1.HttpStatusCodes.OK).json({ message: "Post deleted successfully" });
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
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.js.map