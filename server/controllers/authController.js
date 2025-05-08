const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// register user
const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("please fill out all fields");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });
    const { password: userPassword, ...rest } = user._doc;
    return res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
};

// login user
const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Please fill out all fields");
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    // compare password
    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) {
      res.status(400);
      throw new Error("invalid credentials");
    }

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("jwt", token);
    const { password: userPassword, ...rest } = user._doc;
    return res.json(rest);
  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  res.clearCookie("jwt");
  return res.json({ message: "logout success" });
};

module.exports = { loginController, registerController, logoutController };
