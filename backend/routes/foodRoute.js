import express from "express";
import multer from "multer";
import crypto from "crypto";
import path from "path";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";
import { addFood, listFood, removeFood, updateFood } from "../controllers/foodController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();
const allowedMimes = new Set(["image/jpeg", "image/png", "image/webp"]);
const upload = multer({
  dest: path.resolve(process.env.UPLOAD_DIR || "./uploads"),
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => cb(null, allowedMimes.has(file.mimetype)),
});

router.get("/list", asyncHandler(listFood));
router.post("/add", authMiddleware, adminMiddleware, upload.single("image"), asyncHandler(addFood));
router.patch("/:id", authMiddleware, adminMiddleware, upload.single("image"), asyncHandler(updateFood));
router.delete("/:id", authMiddleware, adminMiddleware, asyncHandler(removeFood));
export default router;
