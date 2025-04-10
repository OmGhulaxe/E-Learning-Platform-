const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  completedLessons: [{ type: String }], // Array of lesson IDs
});

module.exports = mongoose.model("Progress", progressSchema);
