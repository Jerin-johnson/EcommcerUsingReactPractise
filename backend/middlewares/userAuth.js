import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    
    if (!token) {
      return res.status(401).json({ success: false, message: "Access Denied: Please log in." });
    }

    // Verify token
    const decoded = jwt.verify(token, "messi-ronaldo123");

    // Find user
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid token: user not found." });
    }

    // Attach user to request for later use
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default userAuth;
