const validate = require('express-validation');

const { logger } = require('../core/logger');

function errorHandler(err, req, res, next) {
  logger.log('error', err.stack, {label: err.type});

  if (err instanceof validate.ValidationError)
    return res.status(err.statusCode || err.status).json(err);

  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    return res.status(err.statusCode || err.status || 500).json({
      error: {
        type: err.type,
        message: err.message || 'Something went wrong.'
      }
    });
  } else {
    return res.status(err.statusCode || err.status || 500).json({
      error: {
        message: 'Something went wrong.'
      }
    });
  }
}

module.exports = errorHandler;
