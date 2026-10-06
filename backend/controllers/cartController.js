import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";
import { assert } from "../utils/httpError.js";

const assertObjectId = (id) => assert(mongoose.isValidObjectId(id), 422, "INVALID_ID", "Invalid product identifier.");

export const addToCart = async (req, res) => {
  const itemId = String(req.body.itemId || "");
  assertObjectId(itemId);
  assert(await foodModel.exists({ _id: itemId, active: true }), 404, "FOOD_NOT_FOUND", "Product is not available.");
  const user = await userModel.findById(req.user.id);
  assert(user, 404, "USER_NOT_FOUND", "Account not found.");
  const quantity = Number(user.cartData?.[itemId] || 0) + 1;
  user.cartData[itemId] = quantity;
  user.markModified("cartData");
  await user.save();
  res.json({ success: true, message: "Added to cart.", cartData: user.cartData });
};

export const removeFromCart = async (req, res) => {
  const itemId = String(req.body.itemId || "");
  assertObjectId(itemId);
  const user = await userModel.findById(req.user.id);
  assert(user, 404, "USER_NOT_FOUND", "Account not found.");
  const current = Number(user.cartData?.[itemId] || 0);
  if (current <= 1) delete user.cartData[itemId];
  else user.cartData[itemId] = current - 1;
  user.markModified("cartData");
  await user.save();
  res.json({ success: true, message: "Cart updated.", cartData: user.cartData });
};

export const getCart = async (req, res) => {
  const user = await userModel.findById(req.user.id).select("cartData");
  assert(user, 404, "USER_NOT_FOUND", "Account not found.");
  res.json({ success: true, cartData: user.cartData || {} });
};
