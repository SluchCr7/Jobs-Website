const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    resume: {
      type: String, // pdf url
      required: true,
    },

    coverLetter: {
      type: String,
      maxlength: 1000,
    },

    status: {
      type: String,
      enum: ["pending", "reviewed", "accepted", "rejected"],
      default: "pending",
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Prevent duplicate applications
 * (same user applies to same job more than once)
 */
applicationSchema.index(
  { job: 1, applicant: 1 },
  { unique: true }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = { Application }
