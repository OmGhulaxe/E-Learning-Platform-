const express = require("express");
const upload = require("../middlewares/uploadMiddleware"); // Multer setup
const { uploadVideoToCloudinary } = require("../controllers/uploadController");
const { authenticate, isInstructor } = require("../middlewares/authMiddleware");

const router = express.Router();

// Only instructors can upload videos
router.post(
  "/upload-video",
  authenticate,
  isInstructor, // Ensure only instructors can upload
  upload.single("video"),
  uploadVideoToCloudinary
);

module.exports = router;
