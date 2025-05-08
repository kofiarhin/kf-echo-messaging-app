const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const { users } = require("./data");
const User = require("../models/userModel");
const Contact = require("../models/contactModel");
const Conversation = require("../models/conversationModel");
const Message = require("../models/messagesModel");
const bcrypt = require("bcryptjs");

const config = () => {
  const clearDB = async () => {
    await User.deleteMany();
    await Contact.deleteMany();
    await Conversation.deleteMany();
    await Message.deleteMany();
  };
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
    clearDB();
  });

  beforeEach(async () => {
    await clearDB();
    await Promise.all(
      users.map(async (user) => {
        const { password, ...rest } = user;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
          ...rest,
          password: hashedPassword,
        });
      })
    );
  });

  afterEach(async () => {
    await clearDB();
  });

  afterAll(async () => {
    await clearDB();
    await mongoose.connection.close();
  });
};

config();
