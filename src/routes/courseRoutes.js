const express = require("express");
const { authenticate } = require("../middlewares/authMiddleware");
const {
  createCourse,
  enrollCourse,
  getCourse,
  listCourses,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const router = express.Router();

// Routes
router.post("/create", authenticate, createCourse);
router.post("/enroll", authenticate, enrollCourse);
router.get("/:courseId", authenticate, getCourse);
router.get("/", listCourses);
router.put("/:courseId", authenticate, updateCourse);
router.delete("/:courseId", authenticate, deleteCourse);

module.exports = router;
