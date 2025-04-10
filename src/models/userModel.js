const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String,  enum: ["Student", "Instructor", "Admin"], default: "Student" },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
