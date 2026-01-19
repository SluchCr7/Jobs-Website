const asyncHandler = require("express-async-handler");
const { Company } = require("../Modules/Company");
const { User } = require("../Modules/User");
const {cloudUpload, cloudRemove} = require("../config/cloudUpload");
/**
 * @desc    Create new company
 * @route   POST /api/companies
 * @access  Private (Employer)
 */


const createCompany = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    website,
    location,
    industry,
    size,
    foundedYear,
  } = req.body;

  // 1. Check if user already owns a company
  const existingCompany = await Company.findOne({ owner: req.user._id });
  if (existingCompany) {
    return res.status(400).json({ message: "User already owns a company" });
  }

  // 2. Upload logo if exists
  let logoData = {};
  if (req.file) {
    const uploadResult = await cloudUpload(req.file);
    logoData = {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };
  }

  // 3. Create company
  const company = await Company.create({
    name,
    description,
    website,
    location,
    industry,
    size,
    foundedYear,
    logo: logoData,
    owner: req.user._id,
    employees: [req.user._id],
  });

  // 4. Attach company to user
  await User.findByIdAndUpdate(req.user._id, {
    company: company._id,
    role: "employer",
  });

  res.status(201).json({
    message: "Company created successfully",
    company,
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
    .populate("owner", "name email")
    .populate("employees", "name email");

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

  // Only owner can update
  if (company.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
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

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  addEmployee,
};
