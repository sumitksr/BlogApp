const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = (req, res, next) => {
  try {
    const token = req.body.token || req.cookies.token || req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    try {
      // If token is in "Bearer <token>" format
      const actualToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
      const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: "Invalid token" });
    }
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
  
};

