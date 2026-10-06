import jwt from "jsonwebtoken";
import { HttpError } from "../utils/httpError.js";

const extractToken = (req) => {
  const authorization = req.headers.authorization || "";
  if (authorization.startsWith("Bearer ")) return authorization.slice(7);
  return req.headers.token || "";
};

const authMiddleware = (req, _res, next) => {
  const token = extractToken(req);
  if (!token) return next(new HttpError(401, "AUTH_REQUIRED", "Authentication is required."));

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: String(payload.id), role: payload.role || "user" };
    next();
  } catch {
    next(new HttpError(401, "INVALID_TOKEN", "Your session is invalid or expired."));
  }
};

export default authMiddleware;
