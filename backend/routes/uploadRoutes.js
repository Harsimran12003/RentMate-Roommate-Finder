import express from "express";
import upload from "../middleware/upload.js";

const router = express.Router();

// Single file upload
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ url: `/uploads/${req.file.filename}` }); 
});

export default router;
