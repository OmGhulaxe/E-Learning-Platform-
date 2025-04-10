const express = require("express");
// const { authenticate } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");
const {
  createCourse,
  updateCourse,
  getEnrolledStudents,
  addCourseContent,
  deleteCourseContent,
} = require("../controllers/instructorController");
const { authenticate, isInstructor } = require("../middlewares/authMiddleware");
// const { uploadCourseContent } = require("../controllers/instructorController");
const { uploadVideoToCloudinary } = require("../controllers/uploadController");
const upload = require("../middlewares/uploadMiddleware");
// const {deleteCourseContent} =require("../controllers/instructorController");

const router = express.Router();

// Ensure only instructors can access these routes
router.post("/course", authenticate, roleMiddleware(["Instructor"]), createCourse); // Add new course
router.put("/course/:courseId", authenticate, roleMiddleware(["Instructor"]), updateCourse); // Update own course

// Student Management
router.get("/course/:courseId/students", getEnrolledStudents); // View students

// router.post("/upload-content", authenticate, roleMiddleware(["Instructor"]), upload.single("video"), uploadVideo);
router.post(
  "/upload-video",
  authenticate,
  isInstructor, // Ensure only instructors can upload
  upload.single("video"),
  uploadVideoToCloudinary
);

// router.patch('/course/:courseId/add-content',authenticate,isInstructor,addCourseContent);
router.patch('/course/:courseId/add-content',authenticate,roleMiddleware(["Instructor"]),addCourseContent);

router.delete('/course/:courseId/delete-content/:contentId',authenticate,roleMiddleware(["Instructor","Admin"]),deleteCourseContent);


module.exports = router;
