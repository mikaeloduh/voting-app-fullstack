const validate = require('express-validation');

// TODO: Create a proxy for expection logging
function errorHandler(err, req, res, next) {
  if (err instanceof validate.ValidationError)
    return res.status(err.status).json(err);

  if (process.env.NODE_ENV === 'development') {
    return res.status(err.status || 500).json({
      error: {
        type: err.type,
        message: err.message || 'Something went wrong.'
      }
    });
  } else {
    return res.status(err.status || 500).json({
      error: {
        message: 'Something went wrong.'
      }
    });
  }
}

module.exports = errorHandler;
