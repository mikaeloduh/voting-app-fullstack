const express = require('express');
const validate = require('express-validation');

const { signup, login, signupSchema, loginSchema } = require("../api/auth")

const router = express.Router();

/**
 * @api {post} /auth/singup Signup a user
 * 
 * @apiParam {string} email    User ID (in email format)
 * @apiParam {string} username User's Name
 * @apiParam {string} password User's password
 * 
 * @apiSuccess (201) {Object} Username and login token
 * @apiSuccessExample (json) Success-Response:
 *   {
 *     "id": "5e4364daac0804d28bbab94c",
 *     "username": "joe91",
 *     "token": "eyJhbGciOiJIUzVCJ9.eyJpZCI6IjVlNyUwMzR9.lDXv4B02L9MsnLnvZ0"
 *   }
 */
router.post("/signup", validate(signupSchema), signup);

/**
 * @api {post} /auth/login User login
 * 
 * @apiParam {String} email    User ID (in email format)
 * @apiParam {String} password User's password
 * 
 * @apiSuccess (200) {Object} User's uid and login token
 * @apiSuccessExample {json} Success-Response:
 *   {
 *     "uid": "5e3976db443fcc9bd07f48d8",
 *     "token": "eyJhbGckpXVCJ9.eyJpZmNDhkOCIsInVzNDc1NjQ.3mOyVC07tM7JEeJk"
 *   }
 */
router.post("/login", validate(loginSchema), login);

module.exports = router;
