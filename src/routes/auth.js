const express = require('express');
const validate = require('express-validation');

const { signup, login, signupSchema, loginSchema } = require('../api/auth');

const router = express.Router();

/**
 * @api {post} /auth/signup Sign-up a user
 * @apiGroup Auth
 * @apiPermission Public
 *
 * @apiHeader {String="application/json"} Content-Type=application/json
 *
 * @apiParam {Object} data
 * @apiParam {string} data.email    User ID (in email format)
 * @apiParam {string} data.username User's Name
 * @apiParam {string} data.password User's password
 *
 * @apiSuccess (201) {Object} Username and login token
 *
 * @apiSuccessExample {json} Success-Response:
 *   {
 *     "is_success": true,
 *     "body": {
 *       "username": "Mike",
 *       "token": "eyJhbGciOiJIUzVCJ9.eyJpZCI6IjVlNyUwMzR9.lDXv4B02L9MsnLnvZ0"
 *     }
 *   }
 */
router.post('/signup', validate(signupSchema), signup);

/**
 * @api {post} /auth/login User login
 * @apiGroup Auth
 * @apiPermission Public
 *
 * @apiHeader {String="application/json"} Content-Type=application/json
 *
 * @apiParam {Object} data
 * @apiParam {String} data.email    User account (in email format)
 * @apiParam {String} data.password User's password
 *
 * @apiSuccess (200) {Object} Username and login token
 *
 * @apiSuccessExample {json} Success-Response:
 *   {
 *     "is_success": true,
 *     "body": {
 *       "username": "Mike",
 *       "token": "eyJhbGckpXVCJ9.eyJpZmNDhkOCIsInVzNDc1NjQ.3mOyVC07tM7JEeJk"
 *     }
 *   }
 */
router.post('/login', validate(loginSchema), login);

module.exports = router;
