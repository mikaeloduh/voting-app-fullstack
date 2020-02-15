const Joi = require('joi');

const db  = require('../models');

const createPollSchema = {
  body: {
    topic: Joi.string().required(),
    options: Joi.array().items(Joi.object().keys({
      option: Joi.string().required(),
      votes: Joi.number().required()
    })).min(1).required()
  }
};

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
    let poll = await db.Poll.findByIdAndRemove(req.params.poll_id);

    return res.status(200).json({
      message: "Poll #" + req.params.poll_id + " removed!"
    });
  }
  catch(err) {
    return next(err);
  }
}

const modifyPollSchema = {
  body: {
    data: Joi.string().required()
  }
};

// Modify a poll
async function modifyPoll(req, res, next) {
  try {
    let inputId = req.body.data;
    let originDoc = await db.Poll.findById(req.params.poll_id);
    let newOptions = originDoc.options.map(d => {
      if (d._id == inputId) {
        d.votes += 1;
        return d;
      } else {
        return d;
      }
    });
    console.log("newDocOptions:", newOptions);
    let updatedDoc = await db.Poll.findByIdAndUpdate(
      req.params.poll_id,
      { $set: { options: newOptions } },
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
module.exports.createPollSchema = createPollSchema;
module.exports.modifyPollSchema = modifyPollSchema;
