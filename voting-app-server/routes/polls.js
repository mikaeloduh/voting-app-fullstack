const express = require('express');
const { createPoll } = require("../api/polls")

const router = express.Router();

// router.route("/").get(listPolls);
router.route("/").post(createPoll);
// router.route("/poll_id").get(getPoll);
// router.route("/poll_id").delete(delPoll);

module.exports = router;
