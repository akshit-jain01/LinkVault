const express = require("express");
const {nanoid} = require("nanoid");
const Content = require("../models/Content");
const uploadMiddleware = require("../middleware/upload");
const calculateExpiry = require("../utils/expiry");


const router = express.Router();

router.post(
  "/upload",
  uploadMiddleware.none(),   // parses form-data (no files)
  async (req, res) => {
    try {
      const { text, expiresIn } = req.body;

      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      const expiryTime = calculateExpiry(expiresIn);


      const shareId = nanoid(7);

      const content = new Content({
        shareId,
        type: "text",
        content: text,
        expiresAt: expiryTime,
      });

      await content.save();

      res.status(201).json({
        link: `http://localhost:3000/api/view/${shareId}`,
        expiresAt: expiryTime,
        });

    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);


router.post(
  "/upload-file",
  uploadMiddleware.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "File is required" });
      }

      const expiresIn = req.body.expiresIn;
      const expiryTime = calculateExpiry(expiresIn);


      const shareId = nanoid(7);

      const content = new Content({
        shareId,
        type: "file",
        content: req.file.path, // local file path
        expiresAt: expiryTime,
      });

      await content.save();

      res.status(201).json({
        link: `http://localhost:3000/api/view/${shareId}`,
        expiresAt: expiryTime,
        });

    } catch (err) {
      console.error("FILE UPLOAD ERROR:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
