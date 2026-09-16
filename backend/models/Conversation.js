const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  readAt: Date,
  createdAt: { type: Date, default: Date.now },
});

// Pharmacist <-> customer chat (spec §25)
const conversationSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pharmacist: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    messages: [messageSchema],
    status: { type: String, enum: ["open", "closed"], default: "open" },
  },
  { timestamps: true }
);

conversationSchema.index({ customer: 1 });
conversationSchema.index({ pharmacist: 1 });

module.exports = mongoose.model("Conversation", conversationSchema);
