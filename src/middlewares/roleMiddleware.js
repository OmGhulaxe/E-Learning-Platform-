exports.roleMiddleware = (requiredRoles) => (req, res, next) => {
    const userRole = req.user.role; // Assumes req.user is populated by authMiddleware
  
    if (!requiredRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You do not have the required permissions.",
      });
    }
  
    next();
  };
  