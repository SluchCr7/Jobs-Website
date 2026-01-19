const {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  addEmployee,
} = require("../Controllers/CompanyController");

const express = require("express");
const router = express.Router();

const photoUpload = require("../Middelwares/UploadPhoto");
const { protect } = require("../Middlewares/verifyToken");

// ✅ Create company + upload logo
router.post(
  "/",
  protect,
  photoUpload.single("logo"),
  createCompany
);

// ✅ Get all companies (public)
router.get("/", getAllCompanies);

// ✅ Get single company
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
