const User = require("../models/userModel");

const getUsers = async (req, res, next) => {
  const { _id: userId } = req.user;
  try {
    const users = await User.find().select("-password -conversations");
    if (!users) {
      throw new Error("uses not found");
    }
    const filteredUsers = users.filter(
      (user) => user._id.toString() !== userId.toString()
    );

    return res.json(filteredUsers);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers };
