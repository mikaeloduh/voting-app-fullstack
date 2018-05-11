const db  = require('../models');

async function createPoll(req, res, next) {
  try {
    let poll = await db.Poll.create({
      creater: req.body.uid,
      topic: req.body.topic,
      options: req.body.options
    });
    return res.status(201).json(poll);
  }
  catch(err) {
    return next(err);
  }
}

async function listAllPolls(req, res, next) {
  try {
    let messages = await db.Poll.find();
    return res.status(200).json(messages);
  }
  catch(err) {
    return next(err);
  }
}

async function getPoll(req, res, next) {
  try {
    let poll = await db.Poll.findById(req.params.poll_id);
    return res.status(200).json(poll);
  }
  catch(err) {
    return next(err);
  }
}

async function deletePoll(req, res, next) {
  try {
    let message = await db.Poll.findById(req.params.poll_id);
    await message.remove();
    return res.status(200).json({
      message: "message " + req.params.poll_id + " removed"
    });
  }
  catch(err) {
    return next(err);
  }
}

module.exports.createPoll = createPoll;
module.exports.listAllPolls = listAllPolls;
module.exports.getPoll = getPoll;
module.exports.deletePoll = deletePoll;
