const Joi = require('joi');

const db = require('../models');

const createPollSchema = {
  options: { stripUnknown: { body: true } },
  body: {
    data: Joi.object().keys({
      topic: Joi.string().required(),
      options: Joi.array().items(
        Joi.object().keys({
          option: Joi.string().required(),
          votes: Joi.number().required()
        }
      )).min(1).required()
    }).required()
  }
};

/* Create a poll */
async function createPoll(req, res, next) {
  try {
    let created_poll = await db.Poll.create({
      creator: req.body.user,
      topic: req.body.data.topic,
      options: req.body.data.options
    });

    return res.status(201).json({ is_success: true, data: created_poll });
  } catch (err) {
    err.type = 'createPoll';

    return next(err);
  }
}

/* List all polls */
async function listAllPolls(req, res, next) {
  try {
    let polls = await db.Poll.find();

    return res.status(200).json({ is_success: true, data: polls });
  } catch (err) {
    err.type = 'listAllPolls';

    return next(err);
  }
}

/* Get the poll detail */
async function getPoll(req, res, next) {
  try {
    let poll = await db.Poll.findById(req.params.poll_id);

    return res.status(200).json({ is_success: true, data: poll });
  } catch (err) {
    err.type = 'getPoll';

    return next(err);
  }
}

/* Delete a poll */
async function deletePoll(req, res, next) {
  try {
    let poll = await db.Poll.findByIdAndRemove(req.params.poll_id);

    return res.status(200).json({
      is_success: true,
      message: `Poll ${poll._id} removed!`
    });
  } catch (err) {
    err.type = 'deletePoll';

    return next(err);
  }
}

const modifyPollSchema = {
  options: { stripUnknown: { body: true } },
  body: {
    data: Joi.object().keys({
      option_id: Joi.string().required()
    }).required()
  }
};

/* Vote on the poll */
async function modifyPoll(req, res, next) {
  try {
    let updated = await db.Poll.update(
      { _id: req.params.poll_id, 'options._id': req.body.data.option_id },
      { $inc: { 'options.$.votes': 1 } },
      { upsert: false, new: true }
    );

    if (updated.ok !== 1)
      throw new Error('update failed');

    let newDoc = await db.Poll.findById(req.params.poll_id);

    return res.status(200).json({ is_success: true, data: newDoc });
  } catch (err) {
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
