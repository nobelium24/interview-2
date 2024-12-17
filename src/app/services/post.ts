import { AppDataSource } from '../../ormConfig';
import PostModel from '../model/post';
import { Post } from '../../core/types/post';
import { Logger } from '../../core/utils/logger';



export default class PostService {
    private postRepo = AppDataSource.getRepository(PostModel);

    // Create Post
    async createPost(postData: Partial<Post>): Promise<PostModel> {
        const post = this.postRepo.create(postData);
        return await this.postRepo.save(post);
    }

    // Update Post
    async updatePost(postId: string, userId: string, updatedData: Partial<Post>): Promise<PostModel | null> {
        const post = await this.postRepo.findOne({ where: { id: postId, userId: userId } });
        if (post) {
            this.postRepo.merge(post, updatedData); 
            return await this.postRepo.save(post);
        }
        return null;
    }

    async getUserPosts(userId: string): Promise<PostModel[]> {
        return await this.postRepo.find({ where: { userId } });
    }

    async getSinglePost(postId: string, userId: string): Promise<PostModel | null> {
        return await this.postRepo.findOne({ where: { id: postId, userId } });
    }

    // Delete Post
    async deletePost(postId: string): Promise<void> {
        await this.postRepo.delete(postId);
    }

    // Get All Posts
    async getPosts(): Promise<PostModel[]> {
        return await this.postRepo.find({ relations: ['comments'] });
    }
}
