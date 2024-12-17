"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controller/user");
const authMiddleware_1 = require("../../core/middleware/authMiddleware");
const router = (0, express_1.Router)();
const { registerUser, loginUser, verifyUser, createPost, editPost, deletePost, commentOnPost, getAllPosts, getSinglePost, getUserPosts } = new user_1.UserController();
const { verifyUserToken } = new authMiddleware_1.AuthMiddleware();
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
exports.default = router;
//# sourceMappingURL=user.js.map