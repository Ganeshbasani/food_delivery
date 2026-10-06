import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import webhookRouter from "./routes/webhookRoute.js";
import { securityHeadersMiddleware, rateLimit } from "./middleware/security.js";
import { requestContext } from "./middleware/requestContext.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { logger } from "./utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 4000);
const apiPrefix = "/api/v1";

if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is required");
if (!process.env.MONGO_URI) throw new Error("MONGO_URI is required");
if (!process.env.STRIPE_WEBHOOK_SECRET) logger.warn("STRIPE_WEBHOOK_SECRET not configured; payment webhooks cannot be verified");

const allowedOrigins = String(process.env.CORS_ORIGINS || "http://localhost:5173,http://localhost:5174")
  .split(",").map((origin) => origin.trim()).filter(Boolean);

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(requestContext);
app.use(securityHeadersMiddleware);
app.use(cors({ origin: (origin, callback) => (!origin || allowedOrigins.includes(origin) ? callback(null, true) : callback(new Error("CORS origin not allowed"))), credentials: false }));
app.use(rateLimit());
app.use(`/webhooks`, webhookRouter); // raw Stripe body must be parsed before express.json
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use("/images", express.static(path.resolve(__dirname, process.env.UPLOAD_DIR || "./uploads"), { maxAge: "1d" }));

app.get("/", (_req, res) => res.json({ name: "BiteFlow API", version: "1.0.0", status: "ok" }));
app.get("/health/live", (_req, res) => res.json({ status: "ok", service: "biteflow-api" }));
app.get("/health/ready", (_req, res) => {
  const ready = app.locals.dbReady === true;
  res.status(ready ? 200 : 503).json({ status: ready ? "ready" : "not_ready" });
});

app.use(`${apiPrefix}/food`, foodRouter);
app.use(`${apiPrefix}/user`, userRouter);
app.use(`${apiPrefix}/cart`, cartRouter);
app.use(`${apiPrefix}/order`, orderRouter);
// Backward-compatible aliases for existing deployments/clients.
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(port, () => logger.info("server_started", { port, env: process.env.NODE_ENV || "development" }));

try {
  await connectDB();
  app.locals.dbReady = true;
} catch (error) {
  logger.error("startup_database_failure", { message: error.message });
  process.exit(1);
}

const shutdown = async (signal) => {
  logger.info("shutdown_started", { signal });
  server.close(async () => {
    try {
      const mongoose = await import("mongoose");
      await mongoose.default.connection.close();
    } finally {
      process.exit(0);
    }
  });
};
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
