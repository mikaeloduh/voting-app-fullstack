const jwt = require('jsonwebtoken');
const Joi = require('joi');

const db = require('../models');

const signupSchema = {
  options: { allowUnknown: { body: false } },
  body: {
    data: Joi.object().keys({
      email: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required()
    }).required()
  }
};

/* User signup */
async function signup(req, res, next) {
  try {
    let user = await db.User.create(req.body.data);

    return res.status(201).json({
      is_success: true,
      data: {
        username: user.username,
        token: jwt.sign({ id: user.id }, process.env.SECRET)
      }
    });
  } catch (err) {
    err.type = 'signup';
    err.status = 400;

    if (err.code === 11000)
      err.message = 'username or email already exit';

    return next(err);
  }
}

const loginSchema = {
  options: { allowUnknown: { body: false } },
  body: {
    data: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required()
    }).required()
  }
};

/* User login */
async function login(req, res, next) {
  try {
    let user = await db.User.findOne({ email: req.body.data.email });
    if (user === null)
      throw new Error('user not found.');

    let isMatch = await user.comparePassword(req.body.data.password);
    if (!isMatch)
      throw new Error('Invalid password');

    return res.status(200).send({
      is_success: true,
      data: {
        username: user.username,
        token: jwt.sign({ id: user.id }, process.env.SECRET)
      }
    });
  } catch (err) {
    err.type = 'login';
    err.status = 400;

    return next(err);
  }
}

/* Authentication middleware */
async function authenticate(req, res, next) {
  try {
    let auth = req.headers.authorization;
    if (!auth) 
      throw new Error('Please supply a valid token.');

    let decode = await jwt.verify(auth.split(' ')[1], process.env.SECRET);
    req.body.user = decode.id;

    return next();
  } catch (err) {
    err.type = 'authenticate';
    err.status = 400;

    return next(err);
  }
}

/* Authorization middleware */
async function authorize(req, res, next) {
  try {
    let poll = await db.Poll.findById(req.params.poll_id);

    if (poll == null || typeof poll === 'undefined')
      throw new Error('Poll dose not exits.');

    if (req.body.user != poll.creator)
      throw new Error('Unauthorized process.');

    return next();
  } catch (err) {
    err.type = 'authorize';
    err.status = 401;

    return next(err);
  }
}

module.exports.login = login;
module.exports.signup = signup;
module.exports.authenticate = authenticate;
module.exports.authorize = authorize;
module.exports.signupSchema = signupSchema;
module.exports.loginSchema = loginSchema;
