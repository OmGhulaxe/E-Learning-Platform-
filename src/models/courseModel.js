const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Students enrolled
  content: [
    {
      title: { type: String, required: true },
      videoUrl: { type: String },
      duration: { type: Number },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", courseSchema);
