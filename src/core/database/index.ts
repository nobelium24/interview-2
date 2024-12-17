import "reflect-metadata";
import { DataSource } from "typeorm";
import {
    DATABASE, DB_USERNAME,
    PASSWORD, PG_PORT, HOST,
} from "../constants";
import path from "path";
import fs from 'fs';

import dotenv from 'dotenv';
import { AppDataSource } from "../../ormConfig";

dotenv.config();


export const connectToDatabase = async () => {
    try {
        // console.log(HOST, PG_PORT, USERNAME, PASSWORD, DATABASE);
        await AppDataSource.initialize();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log(error);
        throw error;
    }
};