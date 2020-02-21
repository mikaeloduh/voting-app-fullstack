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
    err.type = 'createPoll';

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
    err.type = 'listAllPolls';

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
    err.type = 'getPoll';

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
    err.type = 'deletePoll';

    return next(err);
  }
}

const modifyPollSchema = {
  body: {
    data: Joi.string().required()
  }
};

/* Modify a poll (e.g., make a poll) */
async function modifyPoll(req, res, next) {
  try {
    let updated = await db.Poll.update(
      { "_id": req.params.poll_id, "options._id": req.body.data },
      { "$inc": { "options.$.votes": 1 } },
      { upsert: false, new : true }
    );

    if (updated.ok !== 1)
      throw new Error('update failed');

    let newDoc = await db.Poll.findById(req.params.poll_id);

    return res.status(200).json({ is_success: true, data: newDoc });
  }
  catch(err) {
    err.type = 'modifyPoll';
    err.status = 400;

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
