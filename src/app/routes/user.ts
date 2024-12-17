import { Router } from "express";
import { UserController } from "../controller/user";
import { AuthMiddleware } from "../../core/middleware/authMiddleware";

const router = Router();
const { 
    registerUser, loginUser, verifyUser, 
    createPost, editPost, deletePost, commentOnPost,
    getAllPosts, getSinglePost, getUserPosts
} = new UserController();
const { verifyUserToken } = new AuthMiddleware();

router.post("/", registerUser);
router.get("/post/single-user", verifyUserToken, getUserPosts);
router.post("/login", loginUser);
router.post("/verify", verifyUser);
router.post("/post", verifyUserToken, createPost);
router.put("/post/:postId", verifyUserToken, editPost);
router.delete("/post/:postId", verifyUserToken, deletePost);
router.post("/post/comment/:postId/", verifyUserToken, commentOnPost);
router.get("/posts", verifyUserToken, getAllPosts);
router.get("/post/:postId", verifyUserToken, getSinglePost);

export default router;