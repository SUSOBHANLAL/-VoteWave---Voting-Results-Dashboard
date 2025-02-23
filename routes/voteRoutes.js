const express = require("express");
const voteController = require("../controllers/voteController");

const router = express.Router();

// Add a vote
router.post("/vote", voteController.addVote);

// Get voting results
router.get("/results", voteController.getResults);

module.exports = router;
