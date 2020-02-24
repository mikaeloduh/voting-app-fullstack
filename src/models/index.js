const mongoose = require('mongoose');
const User = require('./user');
const Poll = require('./poll');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/voting-app-fullstack';

mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { keepAlive: true });

module.exports.User = User;
module.exports.Poll = Poll;
