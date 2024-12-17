import { User } from "../types/user"
import { Admin } from "../types/admin"
import { Request, Response, NextFunction } from "express";
import { SessionServices } from "../../app/services/sessionService";
import UserService from "../../app/services/user";
import { HttpStatusCodes } from "../utils/httpStatusCodes";
import AdminService from "../../app/services/admin";
import { Logger } from "../utils/logger";

declare module 'express-serve-static-core' {
    export interface Request {
        user: User;
        admin: Admin;
    }
}

export class AuthMiddleware {
    private sessionService = new SessionServices();
    private userService = new UserService();
    private adminService = new AdminService();

    verifyUserToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const token = req.headers.authorization;
            console.log(token)
            if (!token) {
                res.status(HttpStatusCodes.UNAUTHORIZED).send({ message: "Unauthorized" });
                return;
            }

            const userToken = token.split(" ")[1];
            const tokenPayload = this.sessionService.verifyToken(userToken);
            if (!tokenPayload) {
                res.status(HttpStatusCodes.UNAUTHORIZED).send({ message: "Unauthorized" });
                return;
            }

            const user: User | null = await this.userService.getUserByEmail(tokenPayload.email);
            if (!user) {
                res.status(HttpStatusCodes.UNAUTHORIZED).send({ message: "Unauthorized" });
                return;
            }

            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    }

    verifyAdminToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                res.status(HttpStatusCodes.UNAUTHORIZED).send({ message: "Unauthorized" });
                return;
            }
            const adminToken = token.split(" ")[1];
            const tokenPayload = this.sessionService.verifyToken(adminToken);
            if (!tokenPayload) {
                res.status(HttpStatusCodes.UNAUTHORIZED).send({ message: "Unauthorized" });
                return;
            }
            const admin: Admin | null = await this.adminService.getAdminByEmail(tokenPayload.email);
            if (!admin) {
                res.status(HttpStatusCodes.UNAUTHORIZED).send({ message: "Unauthorized" });
                return;
            }
            req.admin = admin;
            next();
        } catch (error) {
            next(error)
        }
    }

}

