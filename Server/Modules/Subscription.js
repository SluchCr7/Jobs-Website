const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    plan: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free",
    },
    status: {
      type: String,
      enum: ["active", "canceled", "incomplete", "past_due"],
      default: "active",
    },
    stripeId: {
      type: String,
      required: false, // Stripe Customer ID
    },
    stripeSubscriptionId: {
      type: String,
      required: false,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    cancelAtPeriodEnd: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = { Subscription };
