const mongoose = require("mongoose");

// Multi-branch-ready model (spec §28) — unused by the MVP order flow
// until multi-branch is actually enabled, but modeled now so it
// doesn't require a schema migration later.
const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: String,
    phone: String,
    location: { lat: Number, lng: Number },
    workingHours: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Branch", branchSchema);
