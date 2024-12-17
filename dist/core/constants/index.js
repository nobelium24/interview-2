"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXTERNAL_DB_URL = exports.EMAIL = exports.PASSWORD_EMAIL = exports.JWT_SECRET = exports.PORT = exports.HOST = exports.PG_PORT = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DATABASE = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DATABASE = process.env.DATABASE;
exports.DB_USERNAME = process.env.DB_USERNAME;
exports.DB_PASSWORD = process.env.PASSWORD;
exports.PG_PORT = parseInt(process.env.PG_PORT);
exports.HOST = process.env.HOST;
exports.PORT = parseInt(process.env.PORT);
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.PASSWORD_EMAIL = process.env.PASSWORD_EMAIL;
exports.EMAIL = process.env.EMAIL;
exports.EXTERNAL_DB_URL = process.env.EXTERNAL_DB_URL;
//# sourceMappingURL=index.js.map