const write = (level, message, meta = {}) => {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    service: "biteflow-api",
    message,
    ...meta,
  };
  const output = JSON.stringify(entry);
  if (level === "error") console.error(output);
  else console.log(output);
};

export const logger = {
  info: (message, meta) => write("info", message, meta),
  warn: (message, meta) => write("warn", message, meta),
  error: (message, meta) => write("error", message, meta),
};
