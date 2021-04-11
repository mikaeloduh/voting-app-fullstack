const express = require('express');
const validate = require('express-validation');

const { createPoll,
        listAllPolls,
        getPoll,
        deletePoll,
        modifyPoll,
        createPollSchema,
        modifyPollSchema } = require('../api/polls');
const { authenticate, authorize } = require('../api/auth');

const router = express.Router();

/**
 * @api {GET} /api/polls Get a list of all polls
 * @apiGroup Poll
 * @apiPermission Public
 *
 * @apiSuccess {String}   _id            `Poll` primary key
 * @apiSuccess {String}   creator        `User`'s object key
 * @apiSuccess {String}   topic          Poll Topic
 * @apiSuccess {Object[]} options        Array of options
 * @apiSuccess {String}   options.votes  Number of vote
 * @apiSuccess {String}   options.option Title for this option
 * 
 * @apiSuccessExample {json} Success-Response:
 *   {
 *     "is_success": true,
 *     "data": [
 *       {
 *         "_id": "5c00aba4fe60fc1834d3289b",
 *         "creator": "5bee7cb2a2e7075ef9c2f1c8",
 *         "topic": "What is your favorite color?",
 *         "options": [
 *           {
 *             "votes": 0,
 *             "_id": "5c00aba4fe60fc1834d3289e",
 *             "option": "Red"
 *           }, ...
 *         ]
 *       }, ...
 *     ]
 *   }
 */
router.get('/', listAllPolls);

/**
 * @api {POST} /api/polls Create a poll
 * @apiGroup Poll
 * @apiPermission authenticated
 *
 * @apiHeader {String="application/json"} Content-Type=application/json
 * @apiHeader {String} Authorization=Bearer Bearer token
 *
 * @apiParam (body) {Object}   data
 * @apiParam (body) {String}   data.topic           The poll topic to be create
 * @apiParam (body) {Object[]} data.options         Array of options for this poll
 * @apiParam (body) {String}   data.options.option  Title for this option
 * @apiParam (body) {Number}   data.options.votes   Number of votes for this option
 *
 * @apiParamExample {json} Request-Example:
 *   {
 *     "data": {
 *       "topic": "How do you like your steak?",
 *       "options": [
 *         {
 *           "option": "rare",
 *           "votes": 0 
 *         }
 *       ]
 *     }
 *   }
 *
 * @apiSuccess (Success 201) {String}   topic           The poll topic to be create
 * @apiSuccess (Success 201) {Object[]} options         Array of options for this poll
 * @apiSuccess (Success 201) {String}   options.option  Title for this option
 * @apiSuccess (Success 201) {Number}   options.votes   Number of votes for this option
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 201 Created
 *   {
 *     "is_success": true,
 *     "data": {
 *       "topic": "How do you like your steak?",
 *       "options": [
 *         {
 *           "option": "rare",
 *           "votes": 0 
 *         }
 *       ]
 *     }
 *   }
 */
router.post('/', authenticate, validate(createPollSchema), createPoll);

/**
 * @api {GET} /api/polls/:poll_id Get the detail of a poll
 * @apiGroup Poll
 * @apiPermission Public
 * 
 * @apiParam (param) {String} poll_id Poll ID
 *
 * @apiSuccess {String}   _id            Poll ID
 * @apiSuccess {String}   topic          Poll Topic
 * @apiSuccess {String}   creator        `User`'s object key
 * @apiSuccess {Object[]} options        Array of options for this poll
 * @apiSuccess {String}   options.option Title of this option
 * @apiSuccess {String}   options.votes  Number of vote for this option
 *
 * @apiSuccessExample {json} Success-Response:
 *   {
 *     "is_success": true,
 *     "data": [
 *       {
 *         "_id": "5c00aba4fe60fc1834d3289b",
 *         "topic": "What is your favorite color?",
 *         "creator": "5bee7cb2a2e7075ef9c2f1c8",
 *         "options": [
 *           {
 *             "_id": "5c00aba4fe60fc1834d3289e",
 *             "option": "Red",
 *             "votes": 0
 *           }, ...
 *         ]
 *       }, ...
 *     ]
 *   }
 */
router.get('/:poll_id', getPoll);

/**
 * @api {PUT} /api/polls/:poll_id Vote on a poll
 * @apiGroup Poll
 * @apiPermission authenticated
 * 
 * @apiHeader {String="application/json"} Content-Type=application/json
 * @apiHeader {String} Authorization=Bearer Bearer token
 *
 * @apiParam (param) {String} poll_id Poll ID to vote for
 *
 * @apiParam (body) {Object} data
 * @apiParam (body) {string} data.option_id Option id would like to vote
 *
 * @apiExample Request-Example:
 *   PUT /api/pull/6072e7e02c2a64001ba3ac1a
 *
 * @apiParamExample {json} Request-Example:
 *   {
 *     "data": {
 *        "option_id": "5c00aba4fe60fc1834d3289b"
 *     }
 *   }
 * 
 * @apiSuccess {String}   _id            Poll ID
 * @apiSuccess {String}   topic          Poll Topic
 * @apiSuccess {String}   creator        `User`'s object key
 * @apiSuccess {Object[]} options        Array of options for this poll
 * @apiSuccess {String}   options.option Title of this option
 * @apiSuccess {String}   options.votes  Number of vote for this option
 *
 * @apiSuccessExample {json} Success-Response:
 *   {
 *     "is_success": true,
 *     "data": [
 *       {
 *         "_id": "6072e7e02c2a64001ba3ac1a",
 *         "topic": "What is your favorite color?",
 *         "creator": "5bee7cb2a2e7075ef9c2f1c8",
 *         "options": [
 *           {
 *             "_id": "5c00aba4fe60fc1834d3289b",
 *             "option": "Red",
 *             "votes": 1
 *           }, ...
 *         ]
 *       }, ...
 *     ]
 *   }
 */
router.put('/:poll_id', validate(modifyPollSchema), modifyPoll);

/**
 * @api {DELETE} /api/polls/:poll_id Delete a poll
 * @apiGroup Poll
 * @apiPermission authenticated, authorized
 *
 * @apiHeader {String="application/json"} Content-Type=application/json
 * @apiHeader {String} Authorization=Bearer Bearer token
 *
 * @apiParam (param) poll_id Pull ID to be delete
 *
 * @apiSuccess {String} message The poll ID was removed
 */
router.delete('/:poll_id', authenticate, authorize, deletePoll);

module.exports = router;
