const express = require("express");
const { authenticate } = require("../middlewares/authMiddleware"); // Import middleware
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup); // Public route
router.post("/login", login); // Public route
router.get("/profile", authenticate, (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user, // Return the user object attached by the authenticate middleware
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
