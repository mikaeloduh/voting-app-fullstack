const db  = require('../models');

async function createPoll(req, res, next) {
  try {
    let poll = await db.Poll.create({
      creater: req.body.uid,
      name: req.body.name,
      options: req.body.options
    });
    return res.status(201).json(poll);
  }
  catch(err) {
    return next(err);
  }
}


module.exports.createPoll = createPoll;
