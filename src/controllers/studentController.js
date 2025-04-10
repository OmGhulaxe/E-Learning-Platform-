const Course = require("../models/courseModel");

// Browse all available courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({}, { title: 1, description: 1, instructor: 1 }).populate(
      "instructor",
      "name email"
    );

    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//enroll in a course
// exports.enrollInCourse = async(req,res)=>{
//   try {
//     const {courseId} = req.body;
//     if(!courseId){
//       return res.status(400).json({
//         success:false,
//         message:"Course ID is required"
//       });
//     }
//     const course = await courseId.findById(courseId);
//     if(!course){
//       return res.status(404).json({
//         success:false,
//         message:"Course not found"
//       });
//     }
//     //check if already enrolled
//     if(course.students.includes((req.user._id))){
//       return res.status(400).json({
//         success:false,
//         message:"You are already enrolled in this course"
//       });
//     };
//     //push into the student array
//     course.students.push(req.user._id);
//     //save into the db
//     await course.save();
//     return res.status(200).json({ 
//       success:true,
//       message:"Enrolled in course successfully"
//     });
//   } catch (error) {
//     return res.status(500).json({ 
//       success:false,
//       message:"Server error",
//       error:error.message
//     });
//   }
// }
// Enroll in a course
exports.enrollInCourse = async (req, res) => {
    try {
      const { courseId } = req.body;
  
      // Validate input
      if (!courseId) {
        return res.status(400).json({ success: false, message: "Course ID is required." });
      }
  
      const course = await Course.findById(courseId);
  
      if (!course) {
        return res.status(404).json({ success: false, message: "Course not found." });
      }
  
      // Check if already enrolled
      if (course.students.includes(req.user._id)) {
        return res.status(400).json({ success: false, message: "You are already enrolled in this course." });
      }
  
      // Enroll the student
      course.students.push(req.user._id);
      await course.save();
  
      res.status(200).json({ success: true, message: "Enrolled in course successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  

  const Progress = require("../models/progressModel");

// Mark lesson as complete
exports.markLessonComplete = async (req,res) =>{
  try {
    const {courseId,lessonId} = req.params;
    if(!courseId || !lessonId){
      return res.status(400).json({ 
        success:false,
        message:"Course ID and Lesson ID are required"
      });
    }
    let progress = await Progress.findOne({ course: courseId, student: req.user._id });

    if (!progress) {
      // Create a new progress record if it doesn't exist
      progress = await Progress.create({ course: courseId, student: req.user._id, completedLessons: [] });
    }

    // Check if lesson is already marked complete
    if (progress.completedLessons.includes(lessonId)) {
      return res.status(400).json({ success: false, message: "Lesson already marked as complete." });
    }

    // Mark lesson as complete
    progress.completedLessons.push(lessonId);
    await progress.save();

    res.status(200).json({ success: true, message: "Lesson marked as complete.", progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.markLessonComplete = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;

    // Validate input
    if (!courseId || !lessonId) {
      return res.status(400).json({ success: false, message: "Course ID and Lesson ID are required." });
    }

    let progress = await Progress.findOne({ course: courseId, student: req.user._id });

    if (!progress) {
      // Create a new progress record if it doesn't exist
      progress = await Progress.create({ course: courseId, student: req.user._id, completedLessons: [] });
    }

    // Check if lesson is already marked complete
    if (progress.completedLessons.includes(lessonId)) {
      return res.status(400).json({ success: false, message: "Lesson already marked as complete." });
    }

    // Mark lesson as complete
    progress.completedLessons.push(lessonId);
    await progress.save();

    res.status(200).json({ success: true, message: "Lesson marked as complete.", progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




// Get course progress
exports.getCourseProgress = async (req, res) => {
    try {
      const { courseId } = req.params;
  
      // Validate input
      if (!courseId) {
        return res.status(400).json({ success: false, message: "Course ID is required." });
      }
      // .populate() method je aahe te data det asto ..sb madhun nhi use kela tr fkt id det asto
      const progress = await Progress.findOne({ course: courseId, student: req.user._id }).populate(
        "course",
        "title description content"
      );
  
      if (!progress) {
        return res.status(404).json({ success: false, message: "No progress found for this course." });
      }
  
      res.status(200).json({ success: true, progress });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };


  