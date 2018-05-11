const express = require('express');
const { createPoll, listAllPolls, getPoll, deletePoll } = require("../api/polls")

const router = express.Router();

router.route("/").get(listAllPolls);
router.route("/").post(createPoll);
router.route("/:poll_id").get(getPoll);
router.route("/:poll_id").delete(deletePoll);

module.exports = router;
