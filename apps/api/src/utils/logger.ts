const getTimestamp = () => {
  return new Date().toISOString().split('T')[0];
};

export const log = {
  info: (message: string, data?: unknown) => {
    console.log(`[INFO] ${getTimestamp()} - ${message}`);
    if (data) console.dir(data, { depth: null });
  },

  warn: (message: string, data?: unknown) => {
    console.warn(`[WARN] ${getTimestamp()} - ${message}`);
    if (data) console.dir(data, { depth: null });
  },

  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${getTimestamp()} - ${message}`);
    if (error instanceof Error) {
      console.error(error.stack);
    } else if (error) {
      console.dir(error, { depth: null });
    }
  },

  debug: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${getTimestamp()} - ${message}`);
      if (data) console.dir(data, { depth: null });
    }
  },
};
