const Course = require("../models/courseModel");

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, content } = req.body;

    // Validate input
    if (!title || !description || !content) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Create course
    const course = await Course.create({
      title,
      description,
      content,
      instructor: req.user._id,
    });

    res.status(201).json({ success: true, message: "Course created successfully.", course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.addCourseContent = async (req, res) => {
  try {
    const{courseId}=req.params;//get url from url
    const {title, videoUrl, duration} = req.body;

    const course = await Course.findById(courseId);
    if(!course){
      res.status(404).json({
        success:false,
        message:"Course not found!"
      })
    }
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized action" });
    }
    course.content.push({title,videoUrl,duration});

    //save updated course.
    await course.save();
    res.status(200).json({ success: true, message: "Content added successfully", course });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}

exports.deleteCourseContent = async(req,res)=>{
  try {
    const {courseId,contentId}=req.params;
    const course = await Course.findById(courseId);
    if(!course){
      res.status(404).json({
        success:false,
        message:"Course Not Found"
      });
    };
    //jo element pahije nhi toh filter krun taka
    if(course.instructor.toString() !== req.user.id){
      return res.status(403).json({ success: false, message: "Unauthorized to delete content" });
    }
    const updatedContent = course.content.filter((item)=> item._id.toString() !== contentId);
    if(updatedContent.length === course.content.length){
      return res.status(404).json({
        success:false,
        messge:"Content not found"
      })
    }
    // console.log(course.content);
    //save the course
    course.content = updatedContent; //original array madhe modified array takayacha
    await course.save();
    return res.status(200).json({ success: true, message: "Content deleted successfully", course });

  } catch (error) {
   return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    })
  }
}

// Update a course
exports.updateCourse = async (req, res) => {
    try {
      const { courseId, title, description, content } = req.body;
  
      // Validate input
      if (!courseId || (!title && !description && !content)) {
        return res.status(400).json({ success: false, message: "Course ID and at least one field to update are required." });
      }
  
      // Find and update the course
      const course = await Course.findOneAndUpdate(
        { _id: courseId, instructor: req.user._id }, // Only update if the instructor owns the course
        { title, description, content },
        { new: true }
      );
  
      if (!course) {
        return res.status(404).json({ success: false, message: "Course not found or you are not authorized to update it." });
      }
  
      res.status(200).json({ success: true, message: "Course updated successfully.", course });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  
  // View students enrolled in a course
exports.getEnrolledStudents = async (req, res) => {
    try {
      const { courseId } = req.params;
  
      // Validate input
      if (!courseId) {
        return res.status(400).json({ success: false, message: "Course ID is required." });
      }
  
      // Find the course and populate enrolled students
      const course = await Course.findOne({ _id: courseId, instructor: req.user._id })
        .populate("students", "name email")
        .exec();
  
      if (!course) {
        return res.status(404).json({ success: false, message: "Course not found or you are not authorized to view it." });
      }
  
      res.status(200).json({ success: true, students: course.students });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };


  ////upload course content
  // exports.uploadCourseContent = async (req, res) => {
  //   try{
  //     const{courseId ,title,videoUrl,duration} = req.body;

  //     if(!req.file||!req.file.path){
  //       return res.status(400).json({ success: false, message: "No video uploaded!" });
  //     }
  //     videoUrl = req.file.path;

  //     const course = await Course.findById(courseId);
  //     if (!course) {
  //       return res.status(404).json({ success: false, message: "Course not found!" });
  //     }
  //     console.log(course.instructor.toString(), req.user._id.toString());
  //     if (course.instructor.toString() !== req.user._id.toString()) {
  //       return res.status(403).json({ success: false, message: "You are not authorized to upload content for this course!" });
  //     }
  //     course.content.push({ title, videoUrl, duration });
  //     await course.save();

  //     res.status(200).json({
  //       success: true,
  //       message: "Video uploaded successfully!",
  //       videoUrl,
  //       course,
  //     });
  //   } catch (error) {
  //     res.status(500).json({ success: false, message: error.message });
  //   }

  //   }
  
  