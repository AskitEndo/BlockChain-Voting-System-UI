// controllers/voteController.js
const Vote = require("../models/Vote");
const adminMiddleware = require("../middleware/adminMiddleware");

// Vote for a candidate
exports.voteForCandidate = async (req, res) => {
  const { electionId, candidateId } = req.body;
  const vote = new Vote({ userId: req.user.id, electionId, candidateId });
  await vote.save();
  res.status(201).json(vote);
};

// Get all votes (Admin)
exports.getVotes = async (req, res) => {
  const votes = await Vote.find();
  res.status(200).json(votes);
};
