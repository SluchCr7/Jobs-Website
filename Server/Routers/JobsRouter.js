const router = require("express").Router();
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  changeJobStatus,
  getAllJobsByCompany
  , toggleSaveJob
} = require("../Controllers/JobController");

const {
  protect, admin, sameUser, adminOrSameUser, isEmployerWithCompany
} = require("../Middelwares/verifyToken");

// Public routes
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.get("/company/:id", getAllJobsByCompany);

// Protected routes (Employer with Company required)
router.post("/", protect, isEmployerWithCompany, createJob);
router.put("/:id", protect, adminOrSameUser, updateJob);
router.delete("/:id", protect, adminOrSameUser, deleteJob);
router.patch("/:id/status", protect, adminOrSameUser, changeJobStatus);
router.put("/:id/save", protect, toggleSaveJob);
module.exports = router;
