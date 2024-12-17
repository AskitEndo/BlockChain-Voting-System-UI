const express = require("express");
const router = express.Router();
const Election = require("../models/Election");
const { auth, adminAuth } = require("../middleware/auth");

// Get all elections
router.get("/", auth, async (req, res) => {
  try {
    const elections = await Election.find().sort({ createdAt: -1 });

    // Update election status based on end date
    const now = new Date();
    elections.forEach(async (election) => {
      if (election.endDate < now && election.status !== "completed") {
        election.status = "completed";
        await election.save();
      } else if (election.endDate > now && election.status === "upcoming") {
        election.status = "ongoing";
        await election.save();
      }
    });

    res.json(elections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new election (admin only)
router.post("/", [auth, adminAuth], async (req, res) => {
  const election = new Election({
    title: req.body.title,
    description: req.body.description,
    candidates: req.body.candidates,
    endDate: new Date(req.body.endDate),
    status: new Date(req.body.endDate) > new Date() ? "ongoing" : "completed",
  });

  try {
    const newElection = await election.save();
    res.status(201).json(newElection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete election (admin only)
router.delete("/:id", [auth, adminAuth], async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) {
      return res.status(404).json({ message: "Election not found" });
    }

    await Election.findByIdAndDelete(req.params.id);
    res.json({ message: "Election deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Error deleting election" });
  }
});

// Cast a vote
router.post("/:id/vote", auth, async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);

    if (!election) {
      return res.status(404).json({ message: "Election not found" });
    }

    if (election.status !== "ongoing") {
      return res.status(400).json({ message: "Election is not active" });
    }

    const alreadyVoted = election.votes.some(
      (vote) => vote.userId === req.user.id
    );

    if (alreadyVoted) {
      return res.status(400).json({ message: "User has already voted" });
    }

    const candidateExists = election.candidates.some(
      (c) => c._id.toString() === req.body.candidateId
    );

    if (!candidateExists) {
      return res.status(400).json({ message: "Invalid candidate" });
    }

    election.votes.push({
      userId: req.user.id,
      candidateId: req.body.candidateId,
      timestamp: new Date(),
    });

    await election.save();
    res.json(election);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
