"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSwaggerDocument = exports.userSwaggerDocument = exports.specs = exports.swaggerUi = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
exports.swaggerUi = swagger_ui_express_1.default;
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
let userSwaggerDocument;
let adminSwaggerDocument;
try {
    exports.userSwaggerDocument = userSwaggerDocument = yamljs_1.default.load(path_1.default.resolve(__dirname, './src/docs/user-swagger.yaml'));
}
catch (error) {
    console.error('Failed to load user-swagger.yaml from src/docs, trying dist/docs');
    try {
        exports.userSwaggerDocument = userSwaggerDocument = yamljs_1.default.load(path_1.default.resolve(__dirname, '../../dist/docs/user-swagger.yaml'));
    }
    catch (error) {
        console.error('Failed to load user-swagger.yaml from dist/docs');
        try {
            exports.userSwaggerDocument = userSwaggerDocument = yamljs_1.default.load(path_1.default.resolve(__dirname, '../../docs/user-swagger.yaml'));
        }
        catch (error) {
            console.error('Failed to load user-swagger.yaml from root');
            throw error;
        }
    }
}
try {
    exports.adminSwaggerDocument = adminSwaggerDocument = yamljs_1.default.load(path_1.default.resolve(__dirname, './src/docs/admin-swagger.yaml'));
}
catch (error) {
    console.error('Failed to load admin-swagger.yaml from src/docs, trying dist/docs');
    try {
        exports.adminSwaggerDocument = adminSwaggerDocument = yamljs_1.default.load(path_1.default.resolve(__dirname, '../../dist/docs/admin-swagger.yaml'));
    }
    catch (error) {
        console.error('Failed to load admin-swagger.yaml from dist/docs');
        try {
            exports.adminSwaggerDocument = adminSwaggerDocument = yamljs_1.default.load(path_1.default.resolve(__dirname, '../../docs/admin-swagger.yaml'));
        }
        catch (error) {
            console.error('Failed to load admin-swagger.yaml from root');
            throw error;
        }
    }
}
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/app/routes/*.ts', './src/core/@types/*.ts'], // Path to the API docs
};
const specs = (0, swagger_jsdoc_1.default)(options);
exports.specs = specs;
//# sourceMappingURL=swaggerConfig.js.map