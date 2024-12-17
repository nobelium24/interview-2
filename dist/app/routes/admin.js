"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = require("../controller/admin");
const authMiddleware_1 = require("../../core/middleware/authMiddleware");
const router = (0, express_1.Router)();
const { createAdmin, loginAdmin, deletePost, deleteUser, getAllPosts } = new admin_1.AdminController();
const { verifyAdminToken } = new authMiddleware_1.AuthMiddleware();
router.post("/", verifyAdminToken, createAdmin);
router.post("/login", loginAdmin);
router.delete("/post/:postId", verifyAdminToken, deletePost);
router.delete("/user/:userId", verifyAdminToken, deleteUser);
router.get("/posts", verifyAdminToken, getAllPosts);
exports.default = router;
//# sourceMappingURL=admin.js.map