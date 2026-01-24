const mongoose = require("mongoose")
const Joi = require("joi")
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    provider: {
      type: String,
      enum: ["local", "google", "linkedin"],
      default: "local",
    },
    providerId: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: function () {
        return this.provider === "local";
      },
      minlength: 6,
      select: false, // مهم للأمان
    },

    role: {
      type: String,
      enum: ["user", "employer", "admin"],
      default: "user",
    },
    avatar: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        publicId: null
      }
    },
    bio: {
      type: String,
      maxlength: 300,
    },

    resume: {
      type: String, // pdf link
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

const LoginValidate = (user) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
  return schema.validate(user)
}

const ValidateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    role: Joi.string().valid("user", "employer", "admin").optional(),
  })
  return schema.validate(user)
}

const UpdateUserValidate = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    email: Joi.string().email().optional(),
    bio: Joi.string().max(300).optional().allow(""),
  });

  return schema.validate(user);
};

module.exports = { User, LoginValidate, ValidateUser, UpdateUserValidate }
