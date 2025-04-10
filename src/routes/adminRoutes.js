const express = require("express");
const { authenticate } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");
const {
  listUsers,
  updateUserRole,
  deactivateUser,
  deleteUser,
  listCourses,
  deleteCourse,
} = require("../controllers/adminController");

const router = express.Router();

// Ensure only admins can access these routes
router.use(authenticate, roleMiddleware(["admin"]));

// User Management
router.get("/users", listUsers);
router.put("/users/role", updateUserRole);
router.put("/users/deactivate", deactivateUser);
router.delete("/users", deleteUser);

// Course Management
router.get("/courses", listCourses);
router.delete("/courses", deleteCourse);

module.exports = router;
