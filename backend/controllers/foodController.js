import fs from "fs/promises";
import path from "path";
import foodModel from "../models/foodModel.js";
import { assert } from "../utils/httpError.js";
import { cleanText, isPositiveNumber } from "../utils/validation.js";

const uploadDir = path.resolve(process.env.UPLOAD_DIR || "./uploads");

export const listFood = async (req, res) => {
  const page = Math.max(Number.parseInt(req.query.page || "1", 10), 1);
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit || "24", 10), 1), 100);
  const search = cleanText(req.query.search || "", 80);
  const category = cleanText(req.query.category || "", 60);
  const filter = { $or: [{ active: true }, { active: { $exists: false } }] };
  if (category && category !== "All") filter.category = category;
  if (search) filter.$text = { $search: search };

  const [data, total] = await Promise.all([
    foodModel.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    foodModel.countDocuments(filter),
  ]);
  res.json({ success: true, data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
};

export const addFood = async (req, res) => {
  assert(req.file, 422, "IMAGE_REQUIRED", "A product image is required.");
  const name = cleanText(req.body.name, 120);
  const description = cleanText(req.body.description, 500);
  const category = cleanText(req.body.category, 60);
  const price = Number(req.body.price);
  assert(name.length >= 2, 422, "INVALID_NAME", "Food name is required.");
  assert(description.length >= 5, 422, "INVALID_DESCRIPTION", "Food description is required.");
  assert(category.length >= 2, 422, "INVALID_CATEGORY", "Food category is required.");
  assert(isPositiveNumber(price), 422, "INVALID_PRICE", "Price must be greater than zero.");

  const food = await foodModel.create({ name, description, price, category, image: req.file.filename });
  res.status(201).json({ success: true, message: "Product created.", data: food });
};

export const updateFood = async (req, res) => {
  const { id } = req.params;
  const update = {};
  if (req.body.name !== undefined) update.name = cleanText(req.body.name, 120);
  if (req.body.description !== undefined) update.description = cleanText(req.body.description, 500);
  if (req.body.category !== undefined) update.category = cleanText(req.body.category, 60);
  if (req.body.price !== undefined) {
    const price = Number(req.body.price);
    assert(isPositiveNumber(price), 422, "INVALID_PRICE", "Price must be greater than zero.");
    update.price = price;
  }
  if (req.body.active !== undefined) update.active = Boolean(req.body.active);
  if (req.file) update.image = req.file.filename;

  const food = await foodModel.findByIdAndUpdate(id, update, { new: true, runValidators: true });
  assert(food, 404, "FOOD_NOT_FOUND", "Product not found.");
  res.json({ success: true, message: "Product updated.", data: food });
};

export const removeFood = async (req, res) => {
  const food = await foodModel.findById(req.params.id);
  assert(food, 404, "FOOD_NOT_FOUND", "Product not found.");
  food.active = false;
  await food.save();
  // Keep historical order images intact; cleanup can be done by a storage lifecycle job.
  res.json({ success: true, message: "Product archived." });
};
