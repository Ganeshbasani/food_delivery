export class HttpError extends Error {
  constructor(status, code, message, details = undefined) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const assert = (condition, status, code, message, details) => {
  if (!condition) throw new HttpError(status, code, message, details);
};
