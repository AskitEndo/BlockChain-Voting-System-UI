// routes/voteRoutes.js
const express = require("express");
const router = express.Router();
const { voteForCandidate, getVotes } = require("../controllers/voteController");
const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

console.log("voteForCandidate:", voteForCandidate);
console.log("getVotes:", getVotes);

// @desc Vote for a candidate
// @route POST /api/votes
// @access User
router.post("/", authMiddleware, voteForCandidate);

// @desc Get all votes (Admin)
// @route GET /api/votes
// @access Admin
router.get("/", adminMiddleware, getVotes);

module.exports = router;
