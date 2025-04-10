const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword, role } = req.body;

    if (!name || !email || !password || !confirmpassword || !role) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists." });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role, // Save the role
    });

    res.status(201).json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Login function
exports.login = async (req, res) => {
  try {
    // User input
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please sign up first.",
      });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
    // create a new Schema for this.....
    // const loggedInUser = await User.create({
    //   name : user.name,
    //   email: user.email,
    //   loginAt :Date.now()
    // })

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return success response with token
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try{
    const user = await User.findById(req.user._id).select("-password");

    if(!user){
      return res.status(404).json(
        {success:false,
          message:"User not found"
        }
      )
    };
    res.status(200).json({
      success: true,
      user
    });
  } catch(error){
    return res.status(500).json({
      success: false,
      message: "Server error"
    })
  }
};
