const jwt = require('jsonwebtoken');
const Joi = require('joi');

const { AppError } = require('../core/error');
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
      throw new AppError('login', 400, true, 'user not found.');

    let isMatch = await user.comparePassword(req.body.data.password);
    if (!isMatch)
      throw new AppError('login', 400, true, 'Invalid password');

    return res.status(200).send({
      is_success: true,
      data: {
        username: user.username,
        token: jwt.sign({ id: user.id }, process.env.SECRET)
      }
    });
  } catch (err) {
    err.type = 'login';

    return next(err);
  }
}

/* Authentication middleware */
async function authenticate(req, res, next) {
  try {
    let auth = req.headers.authorization;
    if (!auth)
      throw new AppError('authenticate', 400, true, 'Please supply a valid token.');

    let decode = await jwt.verify(auth.split(' ')[1], process.env.SECRET);
    req.body.user = decode.id;

    return next();
  } catch (err) {
    err.type = 'authenticate';

    return next(err);
  }
}

/* Authorization middleware */
async function authorize(req, res, next) {
  try {
    let poll = await db.Poll.findById(req.params.poll_id);

    if (poll == null || typeof poll === 'undefined')
      throw new AppError('authorize', 404, true, 'Poll dose not exits.');

    if (req.body.user != poll.creator)
      throw new AppError('authorize', 401, true, 'Unauthorized process.');

    return next();
  } catch (err) {
    err.type = 'authorize';

    return next(err);
  }
}

module.exports.login = login;
module.exports.signup = signup;
module.exports.authenticate = authenticate;
module.exports.authorize = authorize;
module.exports.signupSchema = signupSchema;
module.exports.loginSchema = loginSchema;
