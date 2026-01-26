const asyncHandler = require("express-async-handler");
const { Company, validateCompany } = require("../Modules/Company");
const { User } = require("../Modules/User");
const { cloudUpload, cloudRemove } = require("../config/cloudUpload");

/**
 * @desc    Create new company
 * @route   POST /api/company
 * @access  Private (Employer only)
 */
const createCompany = asyncHandler(async (req, res) => {
  // 1. Validate role
  if (req.user.role !== "employer" && req.user.role !== "admin") {
    return res.status(403).json({
      message: "Only employers can create companies"
    });
  }

  // 2. Check if user already has a company
  if (req.user.company) {
    return res.status(400).json({
      message: "You already belong to a company"
    });
  }

  // 3. Check if user already owns a company
  const existingCompany = await Company.findOne({ owner: req.user._id });
  if (existingCompany) {
    return res.status(400).json({ message: "You already own a company" });
  }

  // 4. Validate input
  const { error } = validateCompany(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const {
    name,
    description,
    website,
    location,
    industry,
    size,
    foundedYear,
  } = req.body;

  // 5. Upload logo if exists
  let logoUrl = "";
  if (req.file) {
    const uploadResult = await cloudUpload(req.file);
    logoUrl = uploadResult.secure_url;
  }

  // 6. Create company
  const company = await Company.create({
    name,
    description,
    website,
    location,
    industry,
    size,
    foundedYear,
    logo: logoUrl,
    createdBy: req.user._id,
    owner: req.user._id, // For backward compatibility
    members: [
      {
        user: req.user._id,
        role: "owner",
      }
    ],
    employees: [req.user._id], // For backward compatibility
  });

  // 7. Link company to user
  await User.findByIdAndUpdate(req.user._id, {
    company: company._id,
  });

  // 8. Return company with populated data
  const populatedCompany = await Company.findById(company._id)
    .populate("owner", "name email avatar")
    .populate("members.user", "name email avatar");

  res.status(201).json({
    message: "Company created successfully",
    company: populatedCompany,
  });
});

/**
 * @desc    Get all companies
 * @route   GET /api/companies
 * @access  Public
 */
const getAllCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find()
    .populate("owner", "name email")
    .sort({ createdAt: -1 });

  res.json(companies);
});

/**
 * @desc    Get company by ID
 * @route   GET /api/companies/:id
 * @access  Public
 */
const getCompanyById = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id)
    .populate("owner", "name email avatar")
    .populate("members.user", "name email avatar")
    .populate("employees", "name email avatar");

  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }

  res.json(company);
});

/**
 * @desc    Update company
 * @route   PUT /api/companies/:id
 * @access  Private (Owner)
 */
const updateCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }

  // Only owner, admin member, or global admin can update
  const isOwner = company.owner.toString() === req.user._id.toString();
  const isAdminMember = company.members.some(m => m.user.toString() === req.user._id.toString() && m.role === "admin");
  const isGlobalAdmin = req.user.role === "admin";

  if (!isOwner && !isAdminMember && !isGlobalAdmin) {
    return res.status(403).json({ message: "Not authorized to update this company" });
  }

  const updateData = {};
  const fields = [
    "name",
    "description",
    "website",
    "location",
    "industry",
    "size",
    "foundedYear",
  ];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  });

  // ✅ Handle logo update
  if (req.file) {
    // remove old logo
    if (company.logo?.publicId) {
      await cloudRemove(company.logo.publicId);
    }

    // upload new logo
    const uploadResult = await cloudUpload(req.file);
    updateData.logo = {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };
  }

  const updatedCompany = await Company.findByIdAndUpdate(
    req.params.id,
    { $set: updateData },
    { new: true }
  );

  res.json({
    message: "Company updated successfully",
    company: updatedCompany,
  });
});

/**
 * @desc    Delete company
 * @route   DELETE /api/companies/:id
 * @access  Private (Owner / Admin)
 */
const deleteCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }

  if (
    company.owner.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ message: "Not authorized" });
  }

  // ✅ Remove logo from cloud
  if (company.logo?.publicId) {
    await cloudRemove(company.logo.publicId);
  }

  await Company.findByIdAndDelete(req.params.id);

  res.json({ message: "Company deleted successfully" });
});

/**
 * @desc    Add employee to company
 * @route   POST /api/companies/:id/employees
 * @access  Private (Owner)
 */
const addEmployee = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const company = await Company.findById(req.params.id);
  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }

  if (company.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  if (company.employees.includes(userId)) {
    return res.status(400).json({ message: "User already an employee" });
  }

  company.employees.push(userId);
  await company.save();

  res.json({
    message: "Employee added successfully",
    company,
  });
});

/**
 * @desc    Get my company (logged-in user's company)
 * @route   GET /api/company/my-company
 * @access  Private (Employer)
 */
const getMyCompany = asyncHandler(async (req, res) => {
  if (!req.user.company) {
    return res.status(404).json({
      message: "You don't belong to any company yet",
      hasCompany: false
    });
  }

  const company = await Company.findById(req.user.company)
    .populate("owner", "name email avatar")
    .populate("members.user", "name email avatar")
    .populate("employees", "name email avatar");

  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }

  res.json({
    hasCompany: true,
    company
  });
});

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  addEmployee,
  getMyCompany,
};
