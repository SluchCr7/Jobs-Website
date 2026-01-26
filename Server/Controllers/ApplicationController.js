const asyncHandler = require("express-async-handler");
const { Application } = require("../Modules/Application");
const { Job } = require("../Modules/Job");
const { Company } = require("../Modules/Company");

const { cloudUpload } = require("../config/cloudUpload");

/**
 * @desc    Apply to a job
 * @route   POST /api/applications
 * @access  Private (User)
 */
const applyToJob = asyncHandler(async (req, res) => {
  const { jobId, coverLetter } = req.body;
  let resume = req.body.resume; // In case it's sent as string URL

  // 1. Check job exists
  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  // 2. Prevent company members/owners from applying
  // We check by req.user.company (which is the user's primary company)
  // OR if the company actually lists them as a member
  const company = await Company.findById(job.company);
  if (!company) {
    return res.status(404).json({ message: "Company linked to this job not found" });
  }

  const isMember = company.members.some(m => m.user.toString() === req.user._id.toString());
  const isEmployee = company.employees.some(e => e.toString() === req.user._id.toString());
  const isOwner = company.owner.toString() === req.user._id.toString();

  if (isMember || isEmployee || isOwner || (req.user.company && req.user.company.toString() === job.company.toString())) {
    return res.status(400).json({ message: "You cannot apply to jobs in a company you are affiliated with" });
  }

  // Also prevent applying if they created the job specifically
  if (job.createdBy.toString() === req.user._id.toString()) {
    return res.status(400).json({ message: "You cannot apply to your own job" });
  }

  // 3. Prevent duplicate application
  const existingApp = await Application.findOne({
    job: jobId,
    applicant: req.user._id
  });
  if (existingApp) {
    return res.status(400).json({ message: "You have already applied to this job" });
  }

  // 4. Handle Resume Upload
  if (req.file) {
    const uploadResult = await cloudUpload(req.file);
    resume = uploadResult.secure_url;
  }

  if (!resume) {
    // Fallback: Check if user has a resume in their profile
    // For now, we require it explicitly
    return res.status(400).json({ message: "Resume is required (upload or URL)" });
  }

  // 5. Create application
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
 * @route   GET /api/app/my-applications
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
 * @route   GET /api/app/job/:jobId
 * @access  Private (Employer)
 */
const getJobApplications = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  // Only job owner or company owner can view applications
  const isJobOwner = job.createdBy.toString() === req.user._id.toString();
  const isCompanyOwner = req.user.company && job.company.toString() === req.user.company.toString();

  if (!isJobOwner && !isCompanyOwner && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized" });
  }

  const applications = await Application.find({ job: job._id })
    .populate("applicant", "name email avatar resume")
    .sort({ appliedAt: -1 });

  res.json(applications);
});

/**
 * @desc    Get all applications for a company
 * @route   GET /api/app/company/:companyId
 * @access  Private (Employer)
 */
const getCompanyApplications = asyncHandler(async (req, res) => {
  const companyId = req.params.companyId;

  // Verify access: User must be member of this company or admin
  if (req.user.company?.toString() !== companyId && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized to view company applications" });
  }

  const applications = await Application.find({ company: companyId })
    .populate("job", "title location")
    .populate("applicant", "name email avatar")
    .sort({ createdAt: -1 });

  res.json(applications);
});

/**
 * @desc    Update application status
 * @route   PUT /api/app/update/:id
 * @access  Private (Employer)
 */
const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status, id } = req.body;

  const application = await Application.findById(id || req.params.id)
    .populate("job");

  if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }

  // Only company members or admin can update status
  const isJobOwner = application.job.createdBy.toString() === req.user._id.toString();
  const isCompanyMember = req.user.company && application.company.toString() === req.user.company.toString();

  if (!isJobOwner && !isCompanyMember && req.user.role !== "admin") {
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
 * @route   DELETE /api/app/delete/:id
 * @access  Private (Applicant)
 */
const deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }

  if (application.applicant.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized" });
  }

  await Application.findByIdAndDelete(req.params.id);

  res.json({ message: "Application deleted successfully" });
});

module.exports = {
  applyToJob,
  getMyApplications,
  getJobApplications,
  getCompanyApplications,
  updateApplicationStatus,
  deleteApplication,
};
