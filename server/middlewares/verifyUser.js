const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    if (id) {
      const user = await User.findById(id);
      if (user) {
        req.user = user;
      }
    }
    next();
  } catch (error) {
    next();
  }
};

module.exports = verifyUser;
