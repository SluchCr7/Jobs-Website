const { Subscription } = require("../Modules/Subscription");
const { Job } = require("../Modules/Job");

const checkJobPostLimit = async (req, res, next) => {
  const user = req.user;

  // Admins skip subscription checks
  if (user.role === "admin") return next();

  try {
    const subscription = await Subscription.findOne({ user: user._id });
    const plan = subscription ? subscription.plan : "free";

    // Count active jobs by this user/company
    const activeJobsCount = await Job.countDocuments({ createdBy: user._id, status: "open" });

    // Define limits
    const limits = {
      free: 1,
      pro: 10,
      premium: 1000, // Unlimited-ish
    };

    if (activeJobsCount >= limits[plan]) {
      return res.status(403).json({
        message: `You have reached the limit for your ${plan} plan (${limits[plan]} active jobs). Please upgrade to post more.`,
        limitReached: true,
        plan
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Subscription check failed" });
  }
};

module.exports = { checkJobPostLimit };
