const { AppError } = require('../core/error');

const API_TIMEOUT = 120000;

/**
 * Timeout middleware
 * 
 * Set socket timeout value and its callback
 */
module.exports = (req, res, next) => {
  // Set the timeout for all HTTP requests
  req.setTimeout(API_TIMEOUT, () => {
    next(new AppError('timeout', 408, true, 'request timeout'));
  });
  // Set the server response timeout for all HTTP requests
  res.setTimeout(API_TIMEOUT, () => {
    next(new AppError('timeout', 503, false, 'service timeout'));
  });

  next();
};
