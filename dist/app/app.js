"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rateLimiter_1 = require("../core/middleware/rateLimiter");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const swaggerConfig_1 = require("./../docs/swaggerConfig");
const user_1 = __importDefault(require("./routes/user"));
const admin_1 = __importDefault(require("./routes/admin"));
const errorHandler_1 = require("../core/middleware/errorHandler");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: '*' }));
app.use(rateLimiter_1.limiter);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/user', user_1.default);
app.use('/admin', admin_1.default);
// Serve user Swagger docs
app.use('/api/docs/user', swaggerConfig_1.swaggerUi.serveFiles(swaggerConfig_1.userSwaggerDocument), swaggerConfig_1.swaggerUi.setup(swaggerConfig_1.userSwaggerDocument));
// Serve admin Swagger docs
app.use('/api/docs/admin', swaggerConfig_1.swaggerUi.serveFiles(swaggerConfig_1.adminSwaggerDocument), swaggerConfig_1.swaggerUi.setup(swaggerConfig_1.adminSwaggerDocument));
app.use((req, res, next) => {
    console.log(req.url);
    res.status(404).send({ status: "Route not found" });
    next();
});
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map