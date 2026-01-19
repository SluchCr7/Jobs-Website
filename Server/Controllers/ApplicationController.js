const asyncHandler = require("express-async-handler");
const { Application } = require("../Modules/Application");
const { Job } = require("../Modules/Job");
const { Company } = require("../Modules/Company");

/**
 * @desc    Apply to a job
 * @route   POST /api/applications
 * @access  Private (User)
 */
const applyToJob = asyncHandler(async (req, res) => {
  const { jobId, resume, coverLetter } = req.body;

  // 1. Check job exists
  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  // 2. Prevent employer applying to own job
  if (job.createdBy.toString() === req.user._id.toString()) {
    return res.status(400).json({ message: "You cannot apply to your own job" });
  }

  // 3. Create application
  const application = await Application.create({
    job: job._id,
    applicant: req.user._id,
    company: job.company,
    resume,
    coverLetter,
  });

  res.status(201).json({
    message: "Application submitted successfully",
    application,
  });
});

/**
 * @desc    Get current user applications
 * @route   GET /api/applications/me
 * @access  Private (User)
 */
const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({
    applicant: req.user._id,
  })
    .populate("job", "title location jobType")
    .populate("company", "name logo")
    .sort({ createdAt: -1 });

  res.json(applications);
});

/**
 * @desc    Get applications for a job
 * @route   GET /api/applications/job/:jobId
 * @access  Private (Employer)
 */
const getJobApplications = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  // Only job owner can view applications
  if (job.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const applications = await Application.find({ job: job._id })
    .populate("applicant", "name email avatar resume")
    .sort({ appliedAt: -1 });

  res.json(applications);
});

/**
 * @desc    Update application status
 * @route   PUT /api/applications/:id/status
 * @access  Private (Employer)
 */
const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const application = await Application.findById(req.params.id)
    .populate("job");

  if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }

  // Only company owner can update status
  if (application.job.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  application.status = status;
  await application.save();

  res.json({
    message: "Application status updated",
    application,
  });
});

/**
 * @desc    Delete application (withdraw)
 * @route   DELETE /api/applications/:id
 * @access  Private (Applicant)
 */
const deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }

  if (application.applicant.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await Application.findByIdAndDelete(req.params.id);

  res.json({ message: "Application withdrawn successfully" });
});

module.exports = {
  applyToJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
  deleteApplication,
};
