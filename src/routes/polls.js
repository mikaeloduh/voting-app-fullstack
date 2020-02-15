const express = require('express');
const validate = require('express-validation');

const { createPoll,
        listAllPolls,
        getPoll,
        deletePoll,
        modifyPoll,
        createPollSchema,
        modifyPollSchema } = require("../api/polls");
const { authenticate, authorize } = require("../api/auth");

const router = express.Router();

/** 
 * @api {get} /api/polls Fetch a list of all polls
 * 
 * @apiSuccess (200) {Object} `Poll` objects List
 */
router.get("/", listAllPolls);

/**
 * @api {post} /api/poll Create a poll
 * 
 * @apiParam {String}        topic   The poll topic to create
 * @apiParam {Array<string>} options Options for this poll
 * @apiParamExample {json} Request-Example:
 *   {
 *     "topic": "How do you like your steak?",
 *     "options": [
 *       { "option": "rare", "votes": 0 },
 *       { "option": "medium", "votes": 0 },
 *     ]
 *   }
 * 
 * @apiSuccess (201) {Object} The created `Poll` object
 */
router.post("/", authenticate, validate(createPollSchema), createPoll);

/**
 * @api {get} /api/poll/:poll_id Retreve a poll detail by `:poll_id`
 * 
 * @apiSuccess (200) {String}        _id     `Poll` primary key
 * @apiSuccess (200) {String}        creater `User`'s object key
 * @apiSuccess (200) {String}        topic   Poll Title
 * @apiSuccess (200) {Array<String>} options Array of options
 * @apiSuccess (200) {String}        .votes  Number of vote to option
 * @apiSuccess (200) {String}        .option Option name
 * @apiSuccessExample {json} Success-Response: 
 *   [
 *     {
 *       "_id": "5c00aba4fe60fc1834d3289b",
 *       "creater": "5bee7cb2a2e7075ef9c2f1c8",
 *       "topic": "What is your favorite color?",
 *       "options": [
 *         {
 *           "votes": 0,
 *           "_id": "5c00aba4fe60fc1834d3289e",
 *           "option": "Red"
 *         },
 *         ...
 *       ]
 *     },
 *     ...
 *   ]
 */
router.get("/:poll_id", getPoll);

/**
 * @api {put} /api/pull/:poll_id Update a poll by `:poll_id`
 * @permission authenticate
 * 
 * @apiParamExample {json} Request-Example: 
 *   Fields to be update (See @api {post} /api/poll)
 */
router.put("/:poll_id", authenticate, validate(modifyPollSchema), modifyPoll);

/**
 * @api {delete} /api/poll/:poll_id Delete a poll by `:poll_id`
 * @permission authenticate, authorize
 * 
 * @apiSuccess {String} The deleted poll id
 */
router.delete("/:poll_id", authenticate, authorize, deletePoll);

module.exports = router;
