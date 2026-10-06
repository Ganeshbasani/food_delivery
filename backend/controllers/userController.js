import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { assert } from "../utils/httpError.js";
import { isEmail, isStrongPassword, normalizeEmail, cleanText } from "../utils/validation.js";

const createToken = (user) =>
  jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "2h" }
  );

export const loginUser = async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const password = req.body.password;
  assert(isEmail(email), 422, "INVALID_EMAIL", "Please enter a valid email address.");
  assert(typeof password === "string" && password.length > 0, 422, "INVALID_PASSWORD", "Password is required.");

  const user = await userModel.findOne({ email }).select("+password");
  assert(user, 401, "INVALID_CREDENTIALS", "Invalid email or password.");
  const match = await bcrypt.compare(password, user.password);
  assert(match, 401, "INVALID_CREDENTIALS", "Invalid email or password.");

  const token = createToken(user);
  res.json({ success: true, token, role: user.role, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

export const registerUser = async (req, res) => {
  const name = cleanText(req.body.name, 80);
  const email = normalizeEmail(req.body.email);
  const password = req.body.password;

  assert(name.length >= 2, 422, "INVALID_NAME", "Name must contain at least 2 characters.");
  assert(isEmail(email), 422, "INVALID_EMAIL", "Please enter a valid email address.");
  assert(isStrongPassword(password), 422, "WEAK_PASSWORD", "Password must be at least 8 characters and include a letter and a number.");

  const exists = await userModel.exists({ email });
  assert(!exists, 409, "USER_EXISTS", "An account already exists for this email.");

  const saltRounds = Number(process.env.SALT || 12);
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = await userModel.create({ name, email, password: hashedPassword });
  const token = createToken(user);

  res.status(201).json({ success: true, token, role: user.role, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};
