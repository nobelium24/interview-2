"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../../core/constants");
class SessionServices {
    constructor() {
        this.generateToken = (payload) => {
            try {
                const token = jsonwebtoken_1.default.sign(payload, constants_1.JWT_SECRET, { expiresIn: '24h' });
                return token;
            }
            catch (error) {
                console.error(error);
                throw { message: 'Error generating token' };
            }
        };
        this.verifyToken = (token) => {
            try {
                const payload = jsonwebtoken_1.default.verify(token, constants_1.JWT_SECRET);
                return payload;
            }
            catch (error) {
                console.error(error);
                throw { message: 'Error verifying token' };
            }
        };
    }
}
exports.SessionServices = SessionServices;
//# sourceMappingURL=sessionService.js.map