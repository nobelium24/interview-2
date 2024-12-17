import dotenv from 'dotenv';
dotenv.config();



export const DATABASE = process.env.DATABASE as string;
export const DB_USERNAME = process.env.DB_USERNAME as string;
export const DB_PASSWORD = process.env.PASSWORD as string;
export const PG_PORT = parseInt(process.env.PG_PORT as string);
export const HOST = process.env.HOST as string;
export const PORT = parseInt(process.env.PORT as string);
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL as string;
export const EMAIL = process.env.EMAIL as string;
export const EXTERNAL_DB_URL = process.env.EXTERNAL_DB_URL as string;



