// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// @desc Register new user
// @route POST /api/users/register
// @access Public
router.post("/register", registerUser);

// @desc Login user
// @route POST /api/users/login
// @access Public
router.post("/login", loginUser);

module.exports = router;
