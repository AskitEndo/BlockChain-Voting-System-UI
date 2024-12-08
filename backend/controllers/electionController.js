const Election = require("../models/Election");

const getAllElections = async (req, res) => {
  try {
    const elections = await Election.find();
    res.status(200).json(elections);
  } catch (err) {
    console.error("Error fetching elections:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createElection = async (req, res) => {
  try {
    const { name, closingDate, candidates } = req.body;

    // Validate input
    if (!name || !closingDate) {
      return res
        .status(400)
        .json({ message: "Name and closing date are required." });
    }

    const newElection = new Election({
      name,
      closingDate,
      candidates,
    });

    await newElection.save();
    res.status(201).json(newElection);
  } catch (err) {
    console.error("Error creating election:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllElections,
  createElection,
};
