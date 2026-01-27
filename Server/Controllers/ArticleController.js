const asyncHandler = require("express-async-handler");
const { Article, validateArticle } = require("../Modules/Article");
const { cloudUpload } = require("../config/cloudUpload");

/**
 * @desc    Get all articles
 * @route   GET /api/articles
 * @access  Public
 */
const getAllArticles = asyncHandler(async (req, res) => {
    const articles = await Article.find({ isPublished: true })
        .populate("author", "name avatar")
        .populate("company", "name logo")
        .sort({ createdAt: -1 });

    res.status(200).json(articles);
});

/**
 * @desc    Get single article by slug
 * @route   GET /api/articles/:slug
 * @access  Public
 */
const getArticleBySlug = asyncHandler(async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
        .populate("author", "name avatar bio")
        .populate("company", "name logo description");

    if (!article) {
        return res.status(404).json({ message: "Article not found" });
    }

    // Increment views
    article.views += 1;
    await article.save();

    res.status(200).json(article);
});

/**
 * @desc    Create new article
 * @route   POST /api/articles
 * @access  Private (Employer With Company)
 */
const createArticle = asyncHandler(async (req, res) => {
    const { error } = validateArticle(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    let imageData = {
        url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
        publicId: null
    };

    if (req.file) {
        const result = await cloudUpload(req.file);
        imageData = {
            url: result.secure_url,
            publicId: result.public_id
        };
    }

    const article = await Article.create({
        ...req.body,
        author: req.user._id,
        company: req.user.company._id || req.user.company, // Handle both populated and ID
        image: imageData,
        excerpt: req.body.excerpt || req.body.content.substring(0, 150) + "..."
    });

    res.status(201).json({
        message: "Article created successfully",
        article
    });
});

/**
 * @desc    Update article
 * @route   PUT /api/articles/:id
 * @access  Private (Author/Owner)
 */
const updateArticle = asyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id);

    if (!article) {
        return res.status(404).json({ message: "Article not found" });
    }

    // Auth check
    if (article.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
        return res.status(403).json({ message: "Not authorized to update this article" });
    }

    let imageData = article.image;
    if (req.file) {
        const result = await cloudUpload(req.file);
        imageData = {
            url: result.secure_url,
            publicId: result.public_id
        };
    }

    const updatedArticle = await Article.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                ...req.body,
                image: imageData,
                excerpt: req.body.excerpt || (req.body.content ? req.body.content.substring(0, 150) + "..." : article.excerpt)
            }
        },
        { new: true }
    );

    res.status(200).json({
        message: "Article updated successfully",
        article: updatedArticle
    });
});

/**
 * @desc    Delete article
 * @route   DELETE /api/articles/:id
 * @access  Private (Author/Owner)
 */
const deleteArticle = asyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id);

    if (!article) {
        return res.status(404).json({ message: "Article not found" });
    }

    // Auth check
    if (article.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
        return res.status(403).json({ message: "Not authorized to delete this article" });
    }

    await Article.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Article deleted successfully" });
});

/**
 * @desc    Get articles by company
 * @route   GET /api/articles/company/:companyId
 * @access  Public
 */
const getCompanyArticles = asyncHandler(async (req, res) => {
    const articles = await Article.find({ company: req.params.companyId, isPublished: true })
        .populate("author", "name avatar")
        .sort({ createdAt: -1 });

    res.status(200).json(articles);
});

module.exports = {
    getAllArticles,
    getArticleBySlug,
    createArticle,
    updateArticle,
    deleteArticle,
    getCompanyArticles
};
