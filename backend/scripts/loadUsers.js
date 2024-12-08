// scripts/loadUsers.js
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/User"); // Adjust the path as needed

const loadUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Read users.json
    const usersData = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

    // Insert users into the database
    await User.insertMany(usersData);
    console.log("Users have been loaded into the database.");

    // Close connection
    mongoose.connection.close();
  } catch (err) {
    console.error("Error loading users:", err);
    process.exit(1);
  }
};

loadUsers();
