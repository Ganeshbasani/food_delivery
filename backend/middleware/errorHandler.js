import mongoose from "mongoose";
import { HttpError } from "../utils/httpError.js";
import { logger } from "../utils/logger.js";

export const notFoundHandler = (req, _res, next) =>
  next(new HttpError(404, "NOT_FOUND", `Route ${req.method} ${req.originalUrl} was not found.`));

export const errorHandler = (error, req, res, _next) => {
  let err = error;
  if (error?.name === "ValidationError") {
    err = new HttpError(422, "VALIDATION_ERROR", "Request validation failed.", Object.values(error.errors).map((e) => e.message));
  }
  if (error?.name === "MongoServerError" && error.code === 11000) {
    err = new HttpError(409, "DUPLICATE_RESOURCE", "A resource with that value already exists.");
  }
  if (error instanceof mongoose.Error.CastError) {
    err = new HttpError(400, "INVALID_ID", "One of the supplied identifiers is invalid.");
  }

  const status = Number.isInteger(err?.status) ? err.status : 500;
  const code = err?.code || "INTERNAL_ERROR";
  const message = status >= 500 ? "An unexpected server error occurred." : err.message;
  logger.error("request_error", {
    requestId: req.requestId,
    method: req.method,
    path: req.originalUrl,
    status,
    code,
    stack: status >= 500 ? err.stack : undefined,
  });
  res.status(status).json({ success: false, error: { code, message, ...(err.details ? { details: err.details } : {}) } });
};
