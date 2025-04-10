require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const path = require("path");
// const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads/videos", express.static(path.join(__dirname, "uploads/videos")));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes")); // Example route
app.use("/api/courses", require("./routes/courseRoutes"));
// app.use("/api/upload", uploadRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

const instructorRoutes = require("./routes/instructorRoutes");
app.use("/api/instructor", instructorRoutes);

const studentRoutes = require("./routes/studentRoutes");
app.use("/api/student", studentRoutes);




module.exports = app;
