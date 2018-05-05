const mongoose = require('mongoose');
const User     = require('./user');
const Poll     = require('./poll');

mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://127.0.0.1:27017/voting-app-fullstack", {keepAlive: true});

module.exports.User = User;
module.exports.Poll = Poll;
