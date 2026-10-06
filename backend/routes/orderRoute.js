import express from "express";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";
import { placeOrder, paymentStatus, userOrders, listOrders, updateStatus } from "../controllers/orderController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();
router.post("/place", authMiddleware, asyncHandler(placeOrder));
router.get("/payment/:orderId", authMiddleware, asyncHandler(paymentStatus));
router.get("/user", authMiddleware, asyncHandler(userOrders));
router.get("/list", authMiddleware, adminMiddleware, asyncHandler(listOrders));
router.patch("/:orderId/status", authMiddleware, adminMiddleware, asyncHandler(updateStatus));
export default router;
