const mongoose = require("mongoose")

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

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

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

const Company = mongoose.model("Company", companySchema);
module.exports = {Company}
