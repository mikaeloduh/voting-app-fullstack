const db  = require('../models');

// Create a poll
async function createPoll(req, res, next) {
  try {
    let poll = await db.Poll.create({
      creater: req.body.user,
      topic: req.body.topic,
      options: req.body.options
    });
    return res.status(201).json(poll);
  }
  catch(err) {
    return next(err);
  }
}

// List all polls
async function listAllPolls(req, res, next) {
  try {
    let messages = await db.Poll.find();
    return res.status(200).json(messages);
  }
  catch(err) {
    return next(err);
  }
}

// Get a poll
async function getPoll(req, res, next) {
  try {
    let poll = await db.Poll.findById(req.params.poll_id);
    return res.status(200).json(poll);
  }
  catch(err) {
    return next(err);
  }
}

// Delete a poll
async function deletePoll(req, res, next) {
  try {
    let poll = await db.Poll.findById(req.params.poll_id);
    await poll.remove();
    return res.status(200).json({
      message: "Poll #" + req.params.poll_id + " removed!"
    });
  }
  catch(err) {
    return next(err);
  }
}

// modifyPoll a poll
async function modifyPoll(req, res, next) {
  try {
    let inputOpts = req.body.options;
    let updatedDoc = await db.Poll.findByIdAndUpdate(
      req.params.poll_id,
      { $set: { options: inputOpts } },
      {new: true}
    );
    return res.status(200).json(updatedDoc);
  }
  catch(err) {
    return next(err);
  }
}


module.exports.createPoll = createPoll;
module.exports.listAllPolls = listAllPolls;
module.exports.getPoll = getPoll;
module.exports.deletePoll = deletePoll;
module.exports.modifyPoll = modifyPoll;
