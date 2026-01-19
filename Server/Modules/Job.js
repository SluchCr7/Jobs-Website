const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      minlength: 20,
    },

    requirements: [
      {
        type: String,
        trim: true,
      },
    ],

    responsibilities: [
      {
        type: String,
        trim: true,
      },
    ],

    location: {
      type: String,
      required: true,
      trim: true,
    },

    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship", "contract"],
      required: true,
    },

    level: {
      type: String,
      enum: ["junior", "mid", "senior", "lead"],
    },

    salary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: "USD",
      },
    },

    category: {
      type: String,
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },

    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = {Job}
