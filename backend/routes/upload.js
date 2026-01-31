const express = require("express");
const crypto = require("crypto");
const Content = require("../models/Content");

const router = express.Router();

router.post("/upload", async (req, res) => {
  try {
    const { text, expiresIn } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const expiryTime = expiresIn
      ? new Date(Date.now() + expiresIn * 60 * 1000)
      : new Date(Date.now() + 10 * 60 * 1000);

    const shareId = crypto.randomBytes(16).toString("hex");

    const content = new Content({
      shareId,
      type: "text",
      content: text,
      expiresAt: expiryTime,
    });

    await content.save();

    res.status(201).json({
      link: `http://localhost:3000/api/view/${shareId}`,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
