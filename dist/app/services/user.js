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
const ormConfig_1 = require("../../ormConfig");
const user_1 = __importDefault(require("../model/user"));
const logger_1 = require("../../core/utils/logger");
class UserService {
    constructor() {
        this.userRepo = ormConfig_1.AppDataSource.getRepository(user_1.default);
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.userRepo.create(Object.assign(Object.assign({}, userData), { confirmationToken: this.generateConfirmationToken(), isConfirmed: false }));
            const newUser = yield this.userRepo.save(user);
            logger_1.Logger.info(`User signed up: ${newUser.email}`);
            return newUser;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepo.findOne({ where: { email } });
        });
    }
    confirmEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findOne({ where: { email } });
            if (user) {
                user.isConfirmed = true;
                user.confirmationToken = null;
                return yield this.userRepo.save(user);
            }
            return null;
        });
    }
    generateConfirmationToken() {
        return Math.random().toString(36).substr(2, 12);
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepo.find();
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepo.delete(userId);
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.js.map