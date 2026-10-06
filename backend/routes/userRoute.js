import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { rateLimit } from "../middleware/security.js";

const router = express.Router();
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 15, keyPrefix: "auth" });
router.post("/register", authLimiter, asyncHandler(registerUser));
router.post("/login", authLimiter, asyncHandler(loginUser));
export default router;
