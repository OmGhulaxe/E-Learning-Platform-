const Course = require("../models/courseModel");

// Create a course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, instructor } = req.body;

    if (!title || !description  || !instructor) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const course = await Course.create({
      title,
      description,
      instructor, // From authMiddleware,
    });

    res.status(201).json({ success: true, message: "Course created successfully", course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Enroll in a course
exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ success: false, message: "Course ID is required." });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found." });
    }

    if (course.students.includes(req.user._id)) {
      return res.status(400).json({ success: false, message: "You are already enrolled in this course." });
    }

    course.students.push(req.user._id);
    await course.save();

    return res.status(200).json({ success: true, message: "Enrolled successfully!", course });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Get details of a specific course
exports.getCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate("instructor", "name").populate("students", "name");

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found." });
    }

    res.status(200).json({ success: true, course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// List all courses
exports.listCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name");

    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, content } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found." });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "You are not authorized to update this course." });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.content = content || course.content;

    await course.save();

    res.status(200).json({ success: true, message: "Course updated successfully", course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found." });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "You are not authorized to delete this course." });
    }

    await course.deleteOne();

    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
