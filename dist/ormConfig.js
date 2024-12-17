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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: constants_1.EXTERNAL_DB_URL,
    synchronize: true,
    logging: true,
    entities: [
        user_1.default,
        post_1.default,
        comment_1.default,
        admin_1.default
    ],
    ssl: true,
    migrations: [
        process.env.NODE_ENV === 'production'
            ? 'dist/migrations/**/*.js'
            : 'src/migrations/**/*.ts',
    ],
    subscribers: [],
});
//# sourceMappingURL=ormConfig.js.map