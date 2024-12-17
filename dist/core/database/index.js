"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const ormConfig_1 = require("../../ormConfig");
dotenv_1.default.config();
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(HOST, PG_PORT, USERNAME, PASSWORD, DATABASE);
        yield ormConfig_1.AppDataSource.initialize();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=index.js.map