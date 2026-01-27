const mongoose = require("mongoose");
const Joi = require("joi");

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 200,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
        },
        content: {
            type: String,
            required: true,
            minlength: 10,
        },
        excerpt: {
            type: String,
            maxlength: 500,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },
        image: {
            type: Object,
            default: {
                url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
                publicId: null
            }
        },
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
        views: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Generate slug from title before saving
articleSchema.pre("save", function (next) {
    if (this.isModified("title")) {
        this.slug = this.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s-]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }
    next();
});

const Article = mongoose.model("Article", articleSchema);

// Validation
const validateArticle = (article) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(200).required(),
        content: Joi.string().min(10).required(),
        excerpt: Joi.string().max(500).optional().allow(""),
        tags: Joi.array().items(Joi.string()).optional(),
        isPublished: Joi.boolean().optional(),
    });
    return schema.validate(article);
};

module.exports = { Article, validateArticle };
