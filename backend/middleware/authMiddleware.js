const jwt = require("jsonwebtoken");
const User = require("../model/User");

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, 'secret-jwt-key-here');
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: You do not have the required role" });
    }
    next();
  };
};

module.exports = { authenticate, authorizeRoles };
