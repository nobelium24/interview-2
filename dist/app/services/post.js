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
const ormConfig_1 = require("../../ormConfig");
const post_1 = __importDefault(require("../model/post"));
class PostService {
    constructor() {
        this.postRepo = ormConfig_1.AppDataSource.getRepository(post_1.default);
    }
    // Create Post
    createPost(postData) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = this.postRepo.create(postData);
            return yield this.postRepo.save(post);
        });
    }
    // Update Post
    updatePost(postId, userId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postRepo.findOne({ where: { id: postId, userId: userId } });
            if (post) {
                this.postRepo.merge(post, updatedData);
                return yield this.postRepo.save(post);
            }
            return null;
        });
    }
    getUserPosts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepo.find({ where: { userId } });
        });
    }
    getSinglePost(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepo.findOne({ where: { id: postId, userId } });
        });
    }
    // Delete Post
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.postRepo.delete(postId);
        });
    }
    // Get All Posts
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepo.find({ relations: ['comments'] });
        });
    }
}
exports.default = PostService;
//# sourceMappingURL=post.js.map