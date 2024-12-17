import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import UserModel from './user';
import CommentModel from './comment';
import { Post } from '../../core/types/post';

@Entity('posts')
export default class PostModel implements Post {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    @Column({ type: 'varchar', nullable: false })
    title: string;

    @Column({ type: 'text', nullable: false })
    content: string;

    @Column({ type: 'uuid', nullable: false })
    userId: string;

    @ManyToOne(() => UserModel, (user) => user.posts, { onDelete: 'CASCADE' })
    user: UserModel;

    @OneToMany(() => CommentModel, (comment) => comment.post, { cascade: true })
    comments: CommentModel[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
