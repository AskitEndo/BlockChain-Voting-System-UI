const express = require("express");
const router = express.Router();
const {
  getAllElections,
  createElection,
} = require("../controllers/electionController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Public route
router.get("/", getAllElections);

// Admin-only route
router.post("/create", authMiddleware, adminMiddleware, createElection);

module.exports = router;
