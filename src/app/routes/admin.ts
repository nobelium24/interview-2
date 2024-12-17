import { Router } from "express";
import { AdminController } from "../controller/admin";
import { AuthMiddleware } from "../../core/middleware/authMiddleware";

const router = Router();
const {createAdmin, loginAdmin, deletePost, deleteUser, getAllPosts } = new AdminController();
const {verifyAdminToken} = new AuthMiddleware();

router.post("/", verifyAdminToken, createAdmin);
router.post("/login", loginAdmin);
router.delete("/post/:postId", verifyAdminToken, deletePost);
router.delete("/user/:userId", verifyAdminToken, deleteUser);
router.get("/posts", verifyAdminToken, getAllPosts);

export default router;