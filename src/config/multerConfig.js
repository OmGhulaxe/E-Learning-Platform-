const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/videos"); // Directory to store videos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// File filter for video files
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["video/mp4", "video/mkv", "video/avi", "video/mov"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"), false);
  }
};

// Export Multer middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB file size limit
});

module.exports = upload;
