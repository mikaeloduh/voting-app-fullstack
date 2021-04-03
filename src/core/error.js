/**
 * Custom app error object
 */
 class AppError extends Error {
  constructor(type='Internal Server Error', statusCode=500, isOperational=false, ...params) {
    super(...params);

    this.name = this.constructor.name;
    this.type = type;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports.AppError = AppError;
