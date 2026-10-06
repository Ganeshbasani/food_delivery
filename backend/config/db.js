import mongoose from "mongoose";
import { logger } from "../utils/logger.js";

export const connectDB = async () => {
  mongoose.connection.on("connected", () => logger.info("mongodb_connected"));
  mongoose.connection.on("disconnected", () => logger.warn("mongodb_disconnected"));
  mongoose.connection.on("error", (error) => logger.error("mongodb_error", { message: error.message }));
  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10_000,
    maxPoolSize: Number(process.env.MONGO_POOL_SIZE || 20),
  });
};
