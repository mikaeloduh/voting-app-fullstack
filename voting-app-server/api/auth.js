const jwt = require('jsonwebtoken');
const db  = require('../models');

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

async function login(req, res, next) {
  try {
    let user = await db.User.findOne({email: req.body.email});
    let { id, username } = user;
    let isMatch = await user.comparePassword(req.body.password);

    if(isMatch) {
      let token = jwt.sign({id, username}, process.env.SECRET);
      return res.status(200).send({id, username, token});
    } else {
      return next({status: 400, message: "Invalid email or password"});
    }
  }
  catch(err) {
    return next(err);
  }
};

async function authenticate(req, res, next) {
  try {
    let auth = req.headers.Authorization;
    if (!auth) {
      return next({status: 400, message: "Please supply a vaild token."});
    } else {
      let token = auth.split(" ")[1];
      jwt.verify(token, process.env.SECRET, (err, decode) => {
        if(decode) {
          req.body.user = decode.id;
          return next();
        } else {
          return next({status: 400, message: "Please login."});
        }
      });
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
      return next({status: 400, message: "Unthorized process."});
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
