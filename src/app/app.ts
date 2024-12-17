import express, { Request, Response, NextFunction } from 'express';
import { limiter } from '../core/middleware/rateLimiter';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { swaggerUi, userSwaggerDocument, adminSwaggerDocument } from './../docs/swaggerConfig';
import userRoutes from './routes/user';
import adminRoutes from './routes/admin';
import { errorHandler } from '../core/middleware/errorHandler';

const app = express();
dotenv.config();

app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

// Serve user Swagger docs
app.use('/api/docs/user', swaggerUi.serveFiles(userSwaggerDocument), swaggerUi.setup(userSwaggerDocument));

// Serve admin Swagger docs
app.use('/api/docs/admin', swaggerUi.serveFiles(adminSwaggerDocument), swaggerUi.setup(adminSwaggerDocument));

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.url);
    res.status(404).send({ status: "Route not found" });
    next();
});

app.use(errorHandler)

export default app;