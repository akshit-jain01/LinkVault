const express = require("express");
const Content = require("../models/Content");
const fs = require("fs");

const router = express.Router();

/* ---------- METADATA VIEW ---------- */
router.get("/view/:id", async (req, res) => {
  try {
    const content = await Content.findOne({ shareId: req.params.id });

    if (!content) {
      return res.status(404).json({ error: "Invalid link" });
    }

    // ✅ EXPIRY CHECK FIRST
    if (content.expiresAt < new Date()) {
      if (content.type === "file") {
        fs.unlink(content.content, () => {});
      }
      await Content.deleteOne({ _id: content._id });
      return res.status(403).json({ error: "Link expired" });
    }

    // ✅ TEXT
    if (content.type === "text") {
      return res.json({
        type: "text",
        content: content.content,
      });
    }

    // ✅ FILE (metadata only)
    return res.json({
      type: "file",
      fileName: content.content.split("/").pop(),
      downloadUrl: `/api/download/${content.shareId}`,
    });
  } catch (err) {
    console.error("VIEW ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ---------- ACTUAL FILE DOWNLOAD ---------- */
router.get("/download/:id", async (req, res) => {
  try {
    const content = await Content.findOne({ shareId: req.params.id });

    if (!content || content.type !== "file") {
      return res.status(404).json({ error: "File not found" });
    }

    res.download(content.content);
  } catch (err) {
    console.error("DOWNLOAD ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
