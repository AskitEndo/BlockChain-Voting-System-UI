// controllers/voteController.js
const Vote = require("../models/Vote");

// Vote for a candidate
const voteForCandidate = async (req, res) => {
  try {
    const { electionId, candidateId } = req.body;

    // Validate input
    if (!electionId || !candidateId) {
      return res
        .status(400)
        .json({ message: "Election ID and Candidate ID are required." });
    }

    const vote = new Vote({ userId: req.user.id, electionId, candidateId });
    await vote.save();
    res.status(201).json(vote);
  } catch (err) {
    console.error("Error voting for candidate:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all votes (Admin)
const getVotes = async (req, res) => {
  try {
    const votes = await Vote.find();
    res.status(200).json(votes);
  } catch (err) {
    console.error("Error fetching votes:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Export the functions
module.exports = {
  voteForCandidate,
  getVotes,
};
