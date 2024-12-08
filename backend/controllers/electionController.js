// controllers/electionController.js
const Election = require("../models/Election");
const adminMiddleware = require("../middleware/adminMiddleware");

// Create new election
exports.createElection = async (req, res) => {
  const { name, candidates, closingDate } = req.body;
  const election = new Election({ name, candidates, closingDate });
  await election.save();
  res.status(201).json(election);
};

// Get all elections
exports.getElections = async (req, res) => {
  const elections = await Election.find();
  res.status(200).json(elections);
};
