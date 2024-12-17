"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler = (err, req, res, next) => {
    console.log(err);
    return new Promise((resolve) => {
        if (err.name === "ValidationError") {
            // Handle Mongoose validation errors
            const validationErrors = Object.values(err.errors).map((error) => error.message);
            res.status(400).json({ message: err.message || "Validation error", errors: validationErrors, status: false });
        }
        else if (err.name === "AuthenticationError") {
            // Handle custom authentication errors
            res.status(401).json({ message: err.message || "Authentication error", status: false });
        }
        else if (err.name === "AuthorizationError") {
            // Handle custom authorization errors
            res.status(403).json({ message: err.message || "Authorization error", status: false });
        }
        else if (err.name === "TokenVerificationError") {
            res.status(401).json({ message: err.message || "Authentication error", status: false });
        }
        else if (err.name === "FailedTokenGenerationError") {
            res.status(500).json({ message: err.message || "Internal server error", status: false });
        }
        else if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(403).json({ message: err.message || "Authorization error", status: false });
        }
        else if (err.name === "isExist") {
            res.status(400).json({ message: err.message || "User already exist", status: false });
        }
        else if (err.name === "EnvironmentError") {
            res.status(500).json({ message: err.message || "Internal server error", status: false });
        }
        else if (err.name === "InvalidToken") {
            res.status(400).json({ message: err.message || "Invalid verification token", status: false });
        }
        else if (err.name === "InvalidVerificationToken") {
            res.status(400).json({ message: err.message || "Invalid verification token", status: false });
        }
        else if (err.name === 'Invalid_Payment') {
            res.status(402).json({ message: err.message || "Invalid payment details provided", status: false });
        }
        else if (err.name === 'Invalid_Bank_Name') {
            res.status(400).json({ message: err.message || "Invalid bank name", status: false });
        }
        else if (err.name === 'Invalid_Account_Number') {
            res.status(400).json({ message: err.message || "Invalid account number", status: false });
        }
        else if (err.name === 'UserNotFound') {
            res.status(404).json({ message: err.message || "User not found", status: false });
        }
        else if (err.name === 'InvalidAddress') {
            res.status(400).json({ message: err.message || "Invalid address", status: false });
        }
        else {
            res.status(500).json({ message: err.message || "Internal server error", status: false });
        }
        resolve();
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map