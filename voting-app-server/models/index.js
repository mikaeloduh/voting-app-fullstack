const mongoose = require('mongoose');
const User     = require('./user');

mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://127.0.0.1:27017/voting-app-fullstack", {keepAlive: true});

module.exports.User = User;
