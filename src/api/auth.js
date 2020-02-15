const jwt = require('jsonwebtoken');
const Joi = require('joi');

const db  = require('../models');

const signupSchema = {
  body: {
    email: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
  }
};

async function signup(req, res, next) {
  try {
    let user = await db.User.create(req.body);
    let { id, username } = user;
    let token = jwt.sign({id, username}, process.env.SECRET);
    return res.status(201).json({id, username, token});
  }
  catch(err) {
    if(err.code === 11000) {
      err.message = "username or email already exit";
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};

const loginSchema = {
  body: {
    email: Joi.string().required(),
    password: Joi.string().required()
  }
};

async function login(req, res, next) {
  try {
    let user = await db.User.findOne({email: req.body.email});
    if (user===null)
      throw new Error('user not found.');

    let { id, username } = user;

    let isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      let error = new Error('')
      error.status = 401;
      err.type = 'login API';
      throw new Error('Invalid password');
    }

    return res.status(200).send({
      uid: id, 
      token: jwt.sign({ id , username }, process.env.SECRET)
    });
  }
  catch(err) {
    err.type = 'login API'

    return next(err);
  }
};

async function authenticate(req, res, next) {
  try {
    let auth = req.headers.authorization;
    if (auth) {
      let token = auth.split(" ")[1];
      jwt.verify(token, process.env.SECRET, (err, decode) => {
        if(decode) {
          req.body.user = decode.id;
          return next();
        } else {
          return next({status: 400, message: "Please login."});
        }
      });
    } else {
      return next({status: 400, message: "Please supply a vaild token."});
    }
  }
  catch(err) {
    return next(err);
  }
}

async function authorize(req, res, next) {
  try {
    let { creater } = await db.Poll.findById(req.params.poll_id);
    if(req.body.user == creater) {
      return next();
    } else {
      return next({status: 401, message: "Unthorized process."});
    }
  }
  catch(err) {
    return next(err);
  }
}

module.exports.login = login;
module.exports.signup = signup;
module.exports.authenticate = authenticate;
module.exports.authorize = authorize;
module.exports.signupSchema = signupSchema;
module.exports.loginSchema = loginSchema;
