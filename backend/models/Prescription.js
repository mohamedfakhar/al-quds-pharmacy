const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fileUrl: { type: String, required: true }, // private/signed URL only — never public (spec §15)
    fileType: { type: String, enum: ["image/jpeg", "image/png", "application/pdf"], required: true },
    notes: String,
    status: { type: String, enum: ["pending", "approved", "rejected", "expired"], default: "pending" },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rejectionReason: String,
    reviewedAt: Date,
    relatedOrder: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  },
  { timestamps: true }
);

prescriptionSchema.index({ customer: 1 });
prescriptionSchema.index({ status: 1 });

module.exports = mongoose.model("Prescription", prescriptionSchema);
