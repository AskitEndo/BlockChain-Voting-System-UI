// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Import routes
const authRoutes = require("./routes/authRoutes");
const electionRoutes = require("./routes/electionRoutes");
const voteRoutes = require("./routes/voteRoutes");

app.use("/api/users", authRoutes);
app.use("/api/elections", electionRoutes);
app.use("/api/votes", voteRoutes);

app.get("/", (req, res) => res.send("API is running"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
