import { HttpError } from "../utils/httpError.js";

const adminMiddleware = (req, _res, next) => {
  if (req.user?.role !== "admin") {
    return next(new HttpError(403, "ADMIN_REQUIRED", "Administrator access is required."));
  }
  next();
};

export default adminMiddleware;
