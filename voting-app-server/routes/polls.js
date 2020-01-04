const express = require('express');
const { createPoll, listAllPolls, getPoll, deletePoll, modifyPoll } = require("../api/polls");
const { authenticate, authorize } = require("../api/auth");

const router = express.Router();

// Path - /api/polls ...
router.get("/", listAllPolls);
router.post("/", authenticate, createPoll);
router.get("/:poll_id", getPoll);
router.put("/:poll_id", authenticate, modifyPoll);
router.delete("/:poll_id", authenticate, authorize, deletePoll);

module.exports = router;
