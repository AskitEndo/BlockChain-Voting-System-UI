// models/Election.js
const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  candidates: [{ id: String, name: String, symbol: String, party: String }],
  closingDate: { type: Date, required: true },
});

module.exports = mongoose.model("Election", electionSchema);
