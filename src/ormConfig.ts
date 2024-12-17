import { DataSource } from 'typeorm';
import { EXTERNAL_DB_URL } from "./core/constants";
import UserModel from './app/model/user';
import PostModel from './app/model/post';
import CommentModel from './app/model/comment';
import AdminModel from './app/model/admin';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: EXTERNAL_DB_URL,
    synchronize: true, 
    logging: true,
    entities: [
        UserModel,
        PostModel,
        CommentModel,
        AdminModel
    ],
    ssl: true,
    migrations: [
        process.env.NODE_ENV === 'production'
            ? 'dist/migrations/**/*.js' 
            : 'src/migrations/**/*.ts', 
    ],
    subscribers: [],
});