import { AppDataSource } from '../../ormConfig';
import CommentModel from '../model/comment';
import { PostComment } from '../../core/types/comment';
import { Logger } from '../../core/utils/logger';

export default class CommentService {
    private commentRepo = AppDataSource.getRepository(CommentModel);

    // Add Comment to Post
    async addComment(commentData: Partial<PostComment>): Promise<CommentModel> {
        const comment = this.commentRepo.create(commentData);
        return await this.commentRepo.save(comment);
    }

    // Delete Comment
    async deleteComment(commentId: string): Promise<void> {
        await this.commentRepo.delete(commentId);
    }

    // Get Comments for a Post
    async getCommentsByPostId(postId: string): Promise<CommentModel[]> {
        return await this.commentRepo.find({ where: { postId } });
    }
}
