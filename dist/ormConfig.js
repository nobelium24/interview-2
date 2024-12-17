"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const constants_1 = require("./core/constants");
const user_1 = __importDefault(require("./app/model/user"));
const post_1 = __importDefault(require("./app/model/post"));
const comment_1 = __importDefault(require("./app/model/comment"));
const admin_1 = __importDefault(require("./app/model/admin"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: constants_1.HOST,
    port: constants_1.PG_PORT,
    username: constants_1.DB_USERNAME,
    password: constants_1.PASSWORD,
    database: constants_1.DATABASE,
    synchronize: true,
    logging: true,
    entities: [
        user_1.default,
        post_1.default,
        comment_1.default,
        admin_1.default
    ],
    migrations: [
        process.env.NODE_ENV === 'production'
            ? 'dist/migrations/**/*.js'
            : 'src/migrations/**/*.ts',
    ],
    subscribers: [],
});
//# sourceMappingURL=ormConfig.js.map