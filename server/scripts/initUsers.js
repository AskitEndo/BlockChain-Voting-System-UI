const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

async function initializeUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Read users from JSON file
    const users = JSON.parse(
      fs.readFileSync(path.join(__dirname, "users.json"), "utf8")
    );

    // Check if users already exist
    const existingUsers = await User.find();
    if (existingUsers.length > 0) {
      console.log("Users already initialized");
      process.exit(0);
    }

    // Insert users
    await User.insertMany(users);
    console.log("Users initialized successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error initializing users:", error);
    process.exit(1);
  }
}

initializeUsers();
