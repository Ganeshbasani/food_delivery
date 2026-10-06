import express from "express";
import authMiddleware from "../middleware/auth.js";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();
router.use(authMiddleware);
router.post("/add", asyncHandler(addToCart));
router.post("/remove", asyncHandler(removeFromCart));
router.get("/", asyncHandler(getCart));
export default router;
