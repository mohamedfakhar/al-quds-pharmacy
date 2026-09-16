const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: String,      // snapshot at time of order
  price: Number,      // snapshot — NEVER trust price sent from client (spec §55)
  quantity: { type: Number, required: true, min: 1 },
  prescriptionRequired: Boolean,
});

const statusHistorySchema = new mongoose.Schema({
  status: { type: String, required: true },
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  note: String,
  at: { type: Date, default: Date.now },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],

    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
    total: { type: Number, required: true },

    address: {
      governorate: String, city: String, area: String,
      street: String, building: String, apartment: String, notes: String,
    },
    contact: { name: String, phone: String, email: String },

    paymentMethod: { type: String, enum: ["cod", "card"], default: "cod" },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed", "refunded"], default: "pending" },

    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "ready", "out_for_delivery", "delivered", "cancelled"],
      default: "pending",
    },
    statusHistory: [statusHistorySchema],

    prescription: { type: mongoose.Schema.Types.ObjectId, ref: "Prescription" },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" }, // multi-branch ready (spec §28)
    internalNotes: String,
  },
  { timestamps: true }
);

orderSchema.index({ customer: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Order", orderSchema);
