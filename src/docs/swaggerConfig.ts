import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import { Express } from 'express';
import path from 'path';
import { OpenAPIV3 } from 'openapi-types';

let userSwaggerDocument: OpenAPIV3.Document;
let adminSwaggerDocument: OpenAPIV3.Document;

try {
    userSwaggerDocument = yaml.load(path.resolve(__dirname, './src/docs/user-swagger.yaml'));
} catch (error) {
    console.error('Failed to load user-swagger.yaml from src/docs, trying dist/docs');
    try {
        userSwaggerDocument = yaml.load(path.resolve(__dirname, '../../dist/docs/user-swagger.yaml'));
    } catch (error) {
        console.error('Failed to load user-swagger.yaml from dist/docs');
        try {
            userSwaggerDocument = yaml.load(path.resolve(__dirname, '../../docs/user-swagger.yaml'));
        } catch (error) {
            console.error('Failed to load user-swagger.yaml from root');
            throw error;
        }
    }
}

try {
    adminSwaggerDocument = yaml.load(path.resolve(__dirname, './src/docs/admin-swagger.yaml'));
} catch (error) {
    console.error('Failed to load admin-swagger.yaml from src/docs, trying dist/docs');
    try {
        adminSwaggerDocument = yaml.load(path.resolve(__dirname, '../../dist/docs/admin-swagger.yaml'));
    } catch (error) {
        console.error('Failed to load admin-swagger.yaml from dist/docs');
        try {
            adminSwaggerDocument = yaml.load(path.resolve(__dirname, '../../docs/admin-swagger.yaml'));
        } catch (error) {
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

const specs = swaggerJsdoc(options);

export { swaggerUi, specs, userSwaggerDocument, adminSwaggerDocument };