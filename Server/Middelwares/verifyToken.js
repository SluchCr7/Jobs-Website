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

    // Fetch user from DB to ensure validity and get full profile including company
    const user = await User.findById(decoded.id).select("-password").populate("company");

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

// Employer only
const isEmployer = (req, res, next) => {
  if (req.user.role === "employer" || req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Access denied. Employer role required."
    });
  }
};

// Employer with company
const hasCompany = (req, res, next) => {
  if (!req.user.company) {
    return res.status(403).json({
      message: "You must create or join a company first."
    });
  }
  next();
};

// Employer with company (combined check)
const isEmployerWithCompany = (req, res, next) => {
  if (req.user.role !== "employer" && req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Employer role required."
    });
  }

  if (!req.user.company) {
    return res.status(403).json({
      message: "You must create or join a company first to perform this action."
    });
  }

  next();
};

// Same user only
const sameUser = (req, res, next) => {
  if (req.user._id.toString() === req.params.id) {
    next();
  } else {
    return res.status(403).json({ message: "You are not this user!" });
  }
};

// Admin or same user
const adminOrSameUser = (req, res, next) => {
  if (req.user.role === "admin" || req.user._id.toString() === req.params.id) {
    next();
  } else {
    return res.status(403).json({ message: "You are not authorized!" });
  }
};

module.exports = {
  protect,
  admin,
  isEmployer,
  hasCompany,
  isEmployerWithCompany,
  sameUser,
  adminOrSameUser
};
