const asyncHandler = require("express-async-handler");
const { Job } = require("../Modules/Job");
const {User} = require("../Modules/User")

/**
 * @desc    Create new job
 * @route   POST /api/job
 * @access  Private (Employer with Company)
 */
const createJob = asyncHandler(async (req, res) => {
  // 1. Validate role
  if (req.user.role !== "employer" && req.user.role !== "admin") {
    return res.status(403).json({
      message: "Only employers can create jobs"
    });
  }

  // 2. Validate company
  if (!req.user.company) {
    return res.status(403).json({
      message: "You must create or join a company before posting jobs"
    });
  }

  // 3. Create job with company automatically attached
  const job = await Job.create({
    ...req.body,
    company: req.user.company._id || req.user.company, // Handle both populated and non-populated
    createdBy: req.user._id,
  });

  // 4. Populate and return
  const populatedJob = await Job.findById(job._id)
    .populate("company", "name logo location")
    .populate("createdBy", "name email");

  res.status(201).json({
    message: "Job created successfully",
    job: populatedJob,
  });
});

/**
 * @desc    Get all jobs (with filters & pagination)
 * @route   GET /api/jobs
 * @access  Public
 */
const getAllJobs = asyncHandler(async (req, res) => {
  const {
    keyword,
    location,
    jobType,
    level,
    category,
    status,
    page = 1,
    limit = 10,
  } = req.query;

  const query = {};

  if (keyword) {
    query.title = { $regex: keyword, $options: "i" };
  }
  if (location) query.location = location;
  if (jobType) query.jobType = jobType;
  if (level) query.level = level;
  if (category) query.category = category;
  if (status) query.status = status;

  const jobs = await Job.find(query)
    .populate("company", "name logo")
    .populate("createdBy", "name email")
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const totalJobs = await Job.countDocuments(query);

  res.status(200).json({
    totalJobs,
    currentPage: Number(page),
    totalPages: Math.ceil(totalJobs / limit),
    jobs,
  });
});

/**
 * @desc    Get single job by ID
 * @route   GET /api/jobs/:id
 * @access  Public
 */
const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)
    .populate("company", "name logo")
    .populate("createdBy", "name email");

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.status(200).json(job);
});

/**
 * @desc    Update job
 * @route   PUT /api/jobs/:id
 * @access  Private (Owner / Admin)
 */
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  if (
    job.createdBy.toString() !== req.user._id &&
    req.user.role !== 'admin'
  ) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const updatedJob = await Job.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.status(200).json({
    message: "Job updated successfully",
    job: updatedJob,
  });
});

/**
 * @desc    Delete job
 * @route   DELETE /api/jobs/:id
 * @access  Private (Owner / Admin)
 */
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  if (
    job.createdBy.toString() !== req.user._id &&
    req.user.role !== 'admin'
  ) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await job.deleteOne();

  res.status(200).json({ message: "Job deleted successfully" });
});

/**
 * @desc    Change job status (open / closed)
 * @route   PATCH /api/jobs/:id/status
 * @access  Private (Owner / Admin)
 */
const changeJobStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }


  job.status = status;
  await job.save();

  res.status(200).json({
    message: "Job status updated",
    job,
  });
});

const getAllJobsByCompany = async (req, res) => {
  const jobs = await Job.find({ company: req.params.id }).sort({ createdAt: -1 });
  res.status(200).json({ jobs });
};
const toggleSaveJob = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({ message: "Job is not found" });
  }

  const jobIdStr = job._id.toString();
  const savedJobsStr = user.savedJobs.map(id => id.toString());

  if (savedJobsStr.includes(jobIdStr)) {
    // Job موجود مسبقًا → نحذفه
    user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobIdStr);
    await user.save();
    return res.status(200).json({ message: "Job removed from saved jobs", savedJobs: user.savedJobs });
  } else {
    // Job غير موجود → نضيفه
    user.savedJobs.push(job._id);
    await user.save();
    return res.status(200).json({ message: "Job saved successfully", savedJobs: user.savedJobs });
  }
});

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  changeJobStatus,
  getAllJobsByCompany,
  toggleSaveJob
};
