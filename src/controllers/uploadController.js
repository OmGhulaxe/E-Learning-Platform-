const cloudinary = require("../config/cloudinaryConfig");

// Upload video to Cloudinary
const uploadVideoToCloudinary = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No video file uploaded." });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "course_videos",
    });

    res.status(200).json({
      success: true,
      message: "Video uploaded successfully.",
      videoUrl: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Upload failed.", error: error.message });
  }
};

module.exports = { uploadVideoToCloudinary };
