const express = require('express');
const { listPolls, creatPoll, getPoll, delPoll } = require("../handlers/polls")

const router = express.Router();

router.route("/").get(listPolls);
router.route("/").post(creatPoll);
router.route("/poll_id").get(getPoll);
router.route("/poll_id").delete(delPoll);

module.exports = router;
