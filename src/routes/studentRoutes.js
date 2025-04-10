const express = require("express");
const { authenticate } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");
const {
  getAllCourses,
  enrollInCourse,
  markLessonComplete,
  getCourseProgress,
} = require("../controllers/studentController");

const router = express.Router();

// Ensure only students can access these routes
// router.use(authenticate, roleMiddleware(["student"]));

// Course Enrollment
router.get("/courses", getAllCourses); // Browse available courses
router.post("/courses/enroll",authenticate,roleMiddleware(["Student"]) ,enrollInCourse); // Enroll in courses

// Course Progress
router.post("/courses/progress/complete", markLessonComplete); // Mark lessons as complete
router.get("/courses/progress/:courseId", getCourseProgress); // Track course progress

module.exports = router;
