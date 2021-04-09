const config = require('config');
const mongoose = require('mongoose');

const User = require('./user');
const Poll = require('./poll');

const DB_URI = config.get('mongodbUri');

mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect(DB_URI, { keepAlive: true });

module.exports.User = User;
module.exports.Poll = Poll;
