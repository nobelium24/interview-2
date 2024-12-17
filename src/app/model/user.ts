import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import PostModel from './post';
import CommentModel from './comment';
import { User } from '../../core/types/user';

@Entity('users')
export default class UserModel implements User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    @Column({ type: 'varchar', nullable: false })
    firstName: string;

    @Column({ type: 'varchar', nullable: false })
    lastName: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    country: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'boolean', default: false })
    isConfirmed: boolean;

    @Column({ type: 'varchar', nullable: true })
    confirmationToken: string | null;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(() => PostModel, (post) => post.user, { cascade: true })
    posts: PostModel[];

    @OneToMany(() => CommentModel, (comment) => comment.user, { cascade: true })
    comments: CommentModel[];
}
