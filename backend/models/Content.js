const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  shareId: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["text", "file"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Content", contentSchema);
