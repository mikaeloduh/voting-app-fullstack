const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');

const authRoute = require('./routes/auth');
const errorHandler = require('./api/error');
const pollsRoute = require('./routes/polls');
const timeoutHandler = require('./middleware/timeout');

const app = express();

/**
 * Application settings
 */
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

/**
 * Setup and handle timeout request
 */
app.use(timeoutHandler);
app.use(bodyParser.json());

app.get("/test", function(req, res) {
  res.status(200).send('Hello world!');
});

/**
 * API Router
 */
app.use('/auth', authRoute);
app.use('/api/polls', pollsRoute);

/**
 * Error Handler
 */
app.use(function(req, res, next) {
  let err = new Error('Not found');
  err.status = 404;
  
  next(err);
});
app.use(errorHandler);

module.exports = app;
