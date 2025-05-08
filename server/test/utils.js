const User = require("../models/userModel");
const foundUsers = async (users) => {
  return await Promise.all(
    users.map(async (user) => {
      return await User.findOne({ email: user.email });
    })
  );
};

module.exports = { foundUsers };
