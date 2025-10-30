import User from "../models/userModel.js";
import isValidSingUp from "../utils/validateSignup.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    await isValidSingUp(req);

    const { username, email, password } = req.body;

    const savedUser = new User({
      username,
      email,
      password,
    });

    await savedUser.save();

    const token = jwt.sign({ _id: savedUser._id }, "messi-ronaldo123");
    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.json({ success: true, message: "user created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success:false, message: error?.message });
  }
};

export const loginPost = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) throw new Error("Email is required");
    const user = await User.findOne({ email });

    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: user._id }, "messi-ronaldo123");
    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({ success:true,message: "logined successfullt" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({success:false, message: error?.message });
  }
};



  export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

