// models/Vote.js
const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    electionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Election",
      required: true,
    },
    candidateId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vote", voteSchema);
