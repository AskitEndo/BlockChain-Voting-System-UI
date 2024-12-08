const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Import database connection
const connectDB = require("./config/db");
connectDB();

// Initialize the app
const app = express();

// Middleware
app.use(express.json()); // For parsing JSON
app.use(cors()); // For handling CORS

// Define the port
const PORT = process.env.PORT || 5000;

// Import routes
const authRoutes = require("./routes/authRoutes");
const electionRoutes = require("./routes/electionRoutes");
const voteRoutes = require("./routes/voteRoutes");

// Route definitions
app.use(express.json());
app.use("/api/users", authRoutes); // Authentication and user management
app.use("/api/elections", electionRoutes); // Election-related operations
app.use("/api/votes", voteRoutes); // Voting-related operations

// Base route
app.get("/", (req, res) => res.send("API is running"));

// Error handler middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
