// routes/voteRoutes.js
const express = require("express");
const router = express.Router();
const { voteForCandidate, getVotes } = require("../controllers/voteController");
const adminMiddleware = require("../middleware/adminMiddleware");

// @desc Vote for a candidate
// @route POST /api/votes
// @access User
router.post("/", voteForCandidate);

// @desc Get all votes (Admin)
// @route GET /api/votes
// @access Admin
router.get("/", adminMiddleware, getVotes);

module.exports = router;
