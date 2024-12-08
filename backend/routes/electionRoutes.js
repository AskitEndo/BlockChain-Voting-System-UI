// routes/electionRoutes.js
const express = require("express");
const router = express.Router();
const {
  createElection,
  getElections,
} = require("../controllers/electionController");
const adminMiddleware = require("../middleware/adminMiddleware");

// @desc Create new election
// @route POST /api/elections
// @access Admin
router.post("/", adminMiddleware, createElection);

// @desc Get all elections
// @route GET /api/elections
// @access Public
router.get("/", getElections);

module.exports = router;
