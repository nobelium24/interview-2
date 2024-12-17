import { DataSource } from 'typeorm';
import {
    DATABASE, DB_USERNAME,
    PASSWORD, PG_PORT, HOST,
} from "./core/constants";
import UserModel from './app/model/user';
import PostModel from './app/model/post';
import CommentModel from './app/model/comment';
import AdminModel from './app/model/admin';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: HOST,
    port: PG_PORT,
    username: DB_USERNAME,
    password: PASSWORD,
    database: DATABASE,
    synchronize: true, 
    logging: true,
    entities: [
        UserModel,
        PostModel,
        CommentModel,
        AdminModel
    ],
    migrations: [
        process.env.NODE_ENV === 'production'
            ? 'dist/migrations/**/*.js' 
            : 'src/migrations/**/*.ts', 
    ],
    subscribers: [],
});
