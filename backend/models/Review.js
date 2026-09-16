const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true }, // proof of purchase
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: String,
    image: String,
    isApproved: { type: Boolean, default: false }, // admin moderation
  },
  { timestamps: true }
);

// One review per purchased order line (prevents duplicate reviews, spec §22)
reviewSchema.index({ product: 1, user: 1, order: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
