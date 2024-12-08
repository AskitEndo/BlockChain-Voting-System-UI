// models/Vote.js
const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  userId: String,
  electionId: String,
  candidateId: String,
});

module.exports = mongoose.model("Vote", voteSchema);
