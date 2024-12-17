import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import UserModel from './user';
import PostModel from './post';
import { PostComment } from '../../core/types/comment';

@Entity('comments')
export default class CommentModel implements PostComment {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    @Column({ type: 'text', nullable: false })
    content: string;

    @Column({ type: 'uuid', nullable: false })
    postId: string;

    @Column({ type: 'uuid', nullable: false })
    userId: string;

    @ManyToOne(() => UserModel, (user) => user.comments, { onDelete: 'CASCADE' })
    user: UserModel;

    @ManyToOne(() => PostModel, (post) => post.comments, { onDelete: 'CASCADE' })
    post: PostModel;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
