const express = require("express");
const Content = require("../models/Content");
const fs = require("fs");

const router = express.Router();

router.get("/view/:id", async (req, res) => {
  try {
    const content = await Content.findOne({ shareId: req.params.id });

    if (!content) {
      return res.status(403).json({ error: "Invalid link" });
    }

    if (content.type === "file") {
        return res.download(content.content);
    }



    if (content.expiresAt < new Date()) {
        if (content.type === "file") {
            fs.unlink(content.content, () => {});
        }
        await Content.deleteOne({ _id: content._id });
        return res.status(403).json({ error: "Link expired" });
    }

    res.status(200).json({
      type: content.type,
      content: content.content,
    });
  } catch (err) {
    console.error("VIEW ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
