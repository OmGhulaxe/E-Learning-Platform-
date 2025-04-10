const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    
    const user = await User.findById(decoded.id).select("-password");
    console.log(user);
    

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    req.user = user; // Attach user data to the request object
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token." });
  }
};

exports.isInstructor = async(req,res,next)=>{
  if(req.user.role !== "Instructor"){
    res.status(403).json({
      success : false,
      message: "You are not authorized to perform this action"
    }
    );
  };
  next();
}

exports.isAdmin =(req,res,next)=>{
  if(req.user.role !== "Admin"){
    res.statud(403).json({
      success: false,
      message : "You are not authorized to perform this action"
    });
  }
  next();
}
