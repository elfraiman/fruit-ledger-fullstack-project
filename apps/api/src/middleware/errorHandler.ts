import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

/**
 * Create a new API error
 * @param message - The error message
 * @param statusCode - The HTTP status code
 * @param isOperational - Whether the error is operational
 * @returns The created API error
 */
export const createApiError = (
  message: string,
  statusCode: number = 500,
  isOperational: boolean = true
): ApiError => {
  const error: ApiError = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = isOperational;
  return error;
};

/**
 * Error handler middleware
 * @param err - The error object
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function
 */
export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log error details
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * Handle 404 routes
 * @param req - The request object
 * @param res - The response object
 */
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    error: `Route ${req.method} ${req.path} not found`
  });
};

/**
 * Async error wrapper to catch async errors in route handlers
 * @param fn - The async function to wrap
 * @returns The wrapped function
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};