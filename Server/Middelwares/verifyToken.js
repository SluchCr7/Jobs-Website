const jwt = require("jsonwebtoken");
const { User } = require("../Modules/User");

// Verify token middleware
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    // Fetch user from DB to ensure validity and get full profile
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Admin only
const admin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "You are not an administrator!" });
  }
};

// Same user only
const sameUser = (req, res, next) => {
  if (req.user._id === req.params.id) {
    next();
  } else {
    return res.status(403).json({ message: "You are not this user!" });
  }
};

// Admin or same user
const adminOrSameUser = (req, res, next) => {
  if (req.user.role === "admin" || req.user._id === req.params.id) {
    next();
  } else {
    return res.status(403).json({ message: "You are not authorized!" });
  }
};

module.exports = { protect, admin, sameUser, adminOrSameUser };
