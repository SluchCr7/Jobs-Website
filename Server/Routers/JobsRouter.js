const router = require("express").Router();
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  changeJobStatus,
  getAllJobsByCompany
} = require("../Controllers/JobController");

const {
    protect, admin, sameUser, adminOrSameUser
} = require("../Middlewares/verifyToken");

// Public
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.get("/company/:id", getAllJobsByCompany)
// Protected
router.post("/", protect, createJob);
router.put("/:id", protect, adminOrSameUser, updateJob);
router.delete("/:id", protect, adminOrSameUser, deleteJob);
router.patch("/:id/status", protect, adminOrSameUser, changeJobStatus);

module.exports = router;
