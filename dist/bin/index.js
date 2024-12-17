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
process.env.DEBUG = 'socket.io:*';
const database_1 = require("../core/database");
const constants_1 = require("../core/constants");
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("../app/app"));
dotenv_1.default.config();
const server = http_1.default.createServer(app_1.default);
console.log('Using HTTP');
server.timeout = 60000;
server.listen(constants_1.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server running on port ${constants_1.PORT}`);
    yield (0, database_1.connectToDatabase)();
}));
server.on("error", (err) => {
    console.error(err);
    process.exit(1);
});
process.on("uncaughtException", (ev) => {
    console.error(ev.stack);
    process.exit(1);
});
//# sourceMappingURL=index.js.map