const mongoose = require("mongoose")
const Joi = require("joi")

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    logo: {
      type: String, // image url
      default: "",
    },

    coverImage: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      maxlength: 1000,
    },

    website: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    industry: {
      type: String,
      trim: true,
    },

    size: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "500+"],
    },

    foundedYear: {
      type: Number,
    },

    // Creator of the company
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Owner (for backward compatibility, same as createdBy)
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Members with roles
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["owner", "admin", "recruiter"],
          default: "recruiter",
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Legacy employees field (for backward compatibility)
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Validation
const validateCompany = (company) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(1000).optional().allow(""),
    website: Joi.string().uri().optional().allow(""),
    location: Joi.string().optional().allow(""),
    industry: Joi.string().optional().allow(""),
    size: Joi.string().valid("1-10", "11-50", "51-200", "201-500", "500+").optional(),
    foundedYear: Joi.number().min(1800).max(new Date().getFullYear()).optional(),
  });
  return schema.validate(company);
};

const Company = mongoose.model("Company", companySchema);
module.exports = { Company, validateCompany }
