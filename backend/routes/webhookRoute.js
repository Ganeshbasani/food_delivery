import express from "express";
import { stripeWebhook } from "../controllers/orderController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();
router.post("/stripe", express.raw({ type: "application/json" }), asyncHandler(stripeWebhook));
export default router;
