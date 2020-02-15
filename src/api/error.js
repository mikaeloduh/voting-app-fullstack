const validate = require('express-validation');

function errorHandler(err, req, res, next) {
  if (err instanceof validate.ValidationError) 
    return res.status(err.status).json(err);
 
  return res.status(err.status || 500).json({
    error: {
      message: err.message || "Something went wrong."
    }
  });
}

module.exports = errorHandler;
