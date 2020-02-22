const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');

const authRoute = require('./routes/auth');
const db = require('./models');
const errorHandler = require('./api/error');
const pollsRoute = require('./routes/polls');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/test', function(req, res) {
  res.status.send('Hello world!');
});

app.use('/auth', authRoute);
app.use('/api/polls', pollsRoute);

app.use(function(req, res, next) {
  let err = new Error('Not found');
  err.status = 404;
  
  next(err);
});
app.use(errorHandler);

module.exports = app;
