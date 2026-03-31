const {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  addEmployee,
  getMyCompany,
} = require("../Controllers/CompanyController");

const express = require("express");
const router = express.Router();

const photoUpload = require("../Middlewares/UploadPhoto");
const { protect, isEmployer } = require("../Middlewares/verifyToken");

// ✅ Get my company (must be before /:id to avoid conflict)
router.get("/my-company", protect, isEmployer, getMyCompany);

// ✅ Create company + upload logo (Employer only)
router.post(
  "/",
  protect,
  isEmployer,
  photoUpload.single("logo"),
  createCompany
);

// ✅ Get all companies (public)
router.get("/", getAllCompanies);

// ✅ Get single company (public)
router.get("/:id", getCompanyById);

// ✅ Update company (owner check inside controller)
router.put(
  "/:id",
  protect,
  photoUpload.single("logo"),
  updateCompany
);

// ✅ Delete company
router.delete(
  "/:id",
  protect,
  deleteCompany
);

// ✅ Add employee
router.post(
  "/:id/employees",
  protect,
  addEmployee
);

module.exports = router;
