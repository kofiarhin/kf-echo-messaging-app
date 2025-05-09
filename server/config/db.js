const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongo_uri =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_PROD
        : process.env.MONGO_URI_DEV;
    const conn = await mongoose.connect(mongo_uri);
    console.log(conn.connection.host);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
