const router = require("express").Router();
const {
    getAllArticles,
    getArticleBySlug,
    createArticle,
    updateArticle,
    deleteArticle,
    getCompanyArticles,
} = require("../Controllers/ArticleController");
const { protect, isEmployerWithCompany } = require("../Middlewares/verifyToken");
const photoUpload = require("../Middlewares/UploadPhoto");

// Public routes
router.get("/", getAllArticles);
router.get("/company/:companyId", getCompanyArticles);
router.get("/:slug", getArticleBySlug);

// Protected routes
router.post("/", protect, isEmployerWithCompany, photoUpload.single("image"), createArticle);
router.put("/:id", protect, photoUpload.single("image"), updateArticle);
router.delete("/:id", protect, deleteArticle);

module.exports = router;
