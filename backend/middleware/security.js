const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "cross-origin",
};

export const securityHeadersMiddleware = (_req, res, next) => {
  Object.entries(securityHeaders).forEach(([key, value]) => res.setHeader(key, value));
  next();
};

const buckets = new Map();
const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000);
const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX || 120);

export const rateLimit = ({ windowMs = WINDOW_MS, max = MAX_REQUESTS, keyPrefix = "global" } = {}) =>
  (req, res, next) => {
    const key = `${keyPrefix}:${req.ip || req.socket.remoteAddress || "unknown"}`;
    const now = Date.now();
    const current = buckets.get(key);
    if (!current || now - current.windowStart >= windowMs) {
      buckets.set(key, { count: 1, windowStart: now });
      return next();
    }
    current.count += 1;
    if (current.count > max) {
      res.setHeader("Retry-After", Math.ceil((windowMs - (now - current.windowStart)) / 1000));
      return res.status(429).json({
        success: false,
        error: { code: "RATE_LIMITED", message: "Too many requests. Please try again shortly." },
      });
    }
    next();
  };
