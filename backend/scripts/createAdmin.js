import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME = "BiteFlow Administrator" } = process.env;
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required.");
if (ADMIN_PASSWORD.length < 12) throw new Error("ADMIN_PASSWORD must be at least 12 characters.");

await mongoose.connect(process.env.MONGO_URI);
const hash = await bcrypt.hash(ADMIN_PASSWORD, Number(process.env.SALT || 12));
await userModel.updateOne(
  { email: ADMIN_EMAIL.trim().toLowerCase() },
  { $set: { name: ADMIN_NAME, email: ADMIN_EMAIL.trim().toLowerCase(), password: hash, role: "admin" } },
  { upsert: true }
);
console.log(`Admin account provisioned for ${ADMIN_EMAIL.trim().toLowerCase()}.`);
await mongoose.disconnect();
