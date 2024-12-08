const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const { id, password } = req.headers;

    if (!id || !password) {
      return res.status(401).json({ message: "Missing id or password" });
    }

    // Find user by id and password (match the fields properly)
    const user = await User.findOne({ id, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid id or password" });
    }

    // Attach user details to the request
    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = authMiddleware;
