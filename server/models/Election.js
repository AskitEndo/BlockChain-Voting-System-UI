const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  party: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
});

const electionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    candidates: [candidateSchema],
    endDate: {
      type: Date,
      required: true,
    },
    votes: [
      {
        userId: String,
        candidateId: String,
        timestamp: Date,
      },
    ],
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Election", electionSchema);
