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
const comment_1 = __importDefault(require("../model/comment"));
class CommentService {
    constructor() {
        this.commentRepo = ormConfig_1.AppDataSource.getRepository(comment_1.default);
    }
    // Add Comment to Post
    addComment(commentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = this.commentRepo.create(commentData);
            return yield this.commentRepo.save(comment);
        });
    }
    // Delete Comment
    deleteComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.commentRepo.delete(commentId);
        });
    }
    // Get Comments for a Post
    getCommentsByPostId(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commentRepo.find({ where: { postId } });
        });
    }
}
exports.default = CommentService;
//# sourceMappingURL=comment.js.map