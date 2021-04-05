const morgan = require('morgan');

const { stream } = require('../core/logger');

/**
 * HTTP request logger middleware
 *
 * format: HTTP/:http-version :method :url (:status) :res[content-length] - :response-time ms
 */
const stdoutStream = morgan('HTTP/:http-version :method :url (:status) :res[content-length] - :response-time ms', {
  skip: (req, res) => res.statusCode >= 400,
  stream: stream.stdout
});

const stderrStream = morgan('HTTP/:http-version :method :url (:status) :res[content-length] - :response-time ms', {
  skip: (req, res) => res.statusCode < 400,
  stream: stream.stderr
});

module.exports = { stdoutStream, stderrStream };
