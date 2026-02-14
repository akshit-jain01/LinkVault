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
    
  },
  filePath: {
    type: String,
  },

  originalName: {
    type: String,
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
