const multer = require("multer");
const cloudinary = require('../config/cloudinaryConfig');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "e-learning/videos", // Cloudinary folder
      resource_type: "video", // Upload as video
      format: "mp4", // Convert all videos to MP4
    },
  });

  const upload = multer({ storage });

  module.exports = upload;