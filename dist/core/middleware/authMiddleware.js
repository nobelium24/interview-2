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
exports.AuthMiddleware = void 0;
const sessionService_1 = require("../../app/services/sessionService");
const user_1 = __importDefault(require("../../app/services/user"));
const httpStatusCodes_1 = require("../utils/httpStatusCodes");
const admin_1 = __importDefault(require("../../app/services/admin"));
class AuthMiddleware {
    constructor() {
        this.sessionService = new sessionService_1.SessionServices();
        this.userService = new user_1.default();
        this.adminService = new admin_1.default();
        this.verifyUserToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                console.log(token);
                if (!token) {
                    res.status(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED).send({ message: "Unauthorized" });
                    return;
                }
                const userToken = token.split(" ")[1];
                const tokenPayload = this.sessionService.verifyToken(userToken);
                if (!tokenPayload) {
                    res.status(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED).send({ message: "Unauthorized" });
                    return;
                }
                const user = yield this.userService.getUserByEmail(tokenPayload.email);
                if (!user) {
                    res.status(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED).send({ message: "Unauthorized" });
                    return;
                }
                req.user = user;
                next();
            }
            catch (error) {
                next(error);
            }
        });
        this.verifyAdminToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                if (!token) {
                    res.status(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED).send({ message: "Unauthorized" });
                    return;
                }
                const adminToken = token.split(" ")[1];
                const tokenPayload = this.sessionService.verifyToken(adminToken);
                if (!tokenPayload) {
                    res.status(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED).send({ message: "Unauthorized" });
                    return;
                }
                const admin = yield this.adminService.getAdminByEmail(tokenPayload.email);
                if (!admin) {
                    res.status(httpStatusCodes_1.HttpStatusCodes.UNAUTHORIZED).send({ message: "Unauthorized" });
                    return;
                }
                req.admin = admin;
                next();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=authMiddleware.js.map