const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Not authorized. User not logged in." });
    }

    // Find user by id, not _id
    const user = await User.findOne({ id: req.user.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = adminMiddleware;
