const User = require("../models/userModel");

// List all users
exports.listUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude passwords from the response
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Update user role
exports.updateUserRole = async (req, res) => {
    try {
      const { userId, newRole } = req.body;
  
      if (!userId || !newRole) {
        return res.status(400).json({ success: false, message: "User ID and new role are required." });
      }
  
      const user = await User.findByIdAndUpdate(userId, { role: newRole }, { new: true });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      res.status(200).json({ success: true, message: "User role updated successfully.", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  
  // Soft delete (deactivate) user
exports.deactivateUser = async (req, res) => {
    try {
      const { userId } = req.body;
  
      if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required." });
      }
  
      const user = await User.findByIdAndUpdate(userId, { isActive: false }, { new: true });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      res.status(200).json({ success: true, message: "User deactivated successfully.", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  // Permanently delete user
  exports.deleteUser = async (req, res) => {
    try {
      const { userId } = req.body;
  
      if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required." });
      }
  
      const user = await User.findByIdAndDelete(userId);
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      res.status(200).json({ success: true, message: "User deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

///courses controller///
const Course = require("../models/courseModel");

// List all courses
exports.listCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body;
  
      if (!courseId) {
        return res.status(400).json({ success: false, message: "Course ID is required." });
      }
  
      const course = await Course.findByIdAndDelete(courseId);
  
      if (!course) {
        return res.status(404).json({ success: false, message: "Course not found." });
      }
  
      res.status(200).json({ success: true, message: "Course deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  