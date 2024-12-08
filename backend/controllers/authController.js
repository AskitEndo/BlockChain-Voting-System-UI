// controllers/authController.js
const User = require("../models/User");

// Register new user
exports.registerUser = async (req, res) => {
  const { id, password } = req.body;
  try {
    const user = new User({ id, password });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { id, password } = req.body;
  const user = await User.findOne({ id });
  if (user && user.password === password) {
    res.status(200).json({ message: "Login successful", user });
  } else {
    res.status(401).json({ message: "Invalid ID or password" });
  }
};
