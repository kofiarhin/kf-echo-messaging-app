const Message = require("../models/messagesModel");
const Contact = require("../models/contactModel");
const Conversation = require("../models/conversationModel");
const User = require("../models/userModel");

const sendMessage = async (data) => {
  try {
    // check if there are any message in conversations
    const check = await Message.findOne({
      conversationId: data.conversationId,
    });

    if (!check) {
      // crreate new message in converation
      const message = await Message.create({
        conversationId: data.conversationId,
        messages: [{ senderId: data.senderId, message: data.message }],
      });
      console.log(message);
    } else {
      // update message convesation
      const updatedConversation = await Message.findOneAndUpdate(
        { conversationId: data.conversationId },
        {
          $push: {
            messages: { senderId: data.senderId, message: data.message },
          },
        },
        { new: true }
      );
      console.log(updatedConversation);
    }
  } catch (error) {
    console.log(error);
  }
};

const createContact = async (userId, contactId) => {
  const contact = await Contact.create({ userId, contactId });
  return contact;
};
const createConversation = async (userId, contactId) => {
  try {
    const check = await Conversation.findOne({
      participants: { $all: [userId, contactId] },
    });

    if (check) {
      throw new Error("conversation already exist");
    }
    const conversation = await Conversation.create({
      participants: [userId, contactId],
    });
    return conversation;
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }
};

const getConversationByParticipants = async (p1, p2) => {
  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [p1, p2] },
    });
    if (!conversation) {
      throw new Error("conersation not found");
    }
    return conversation;
  } catch (error) {
    return { error: error.message };
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("user not found");
    }
    return user;
  } catch (error) {
    return { error: error.message };
  }
};

const getConversationById = async (conversationId) => {
  try {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      throw new Error("conversation not found");
    }
    return conversation;
  } catch (error) {
    return { error: error.message };
  }
};

const createMessage = async (messageData) => {
  try {
    const newMessage = await Message.create(messageData);

    if (!newMessage) {
      throw new Error("message was not created");
    }

    // update conversation
    const updatedConversation = await Conversation.findByIdAndUpdate(
      messageData.conversationId,
      {
        $set: {
          lastMessage: newMessage._id,
          lastMessageCreatedAt: newMessage.createdAt,
        },
      },
      { new: true }
    );

    return newMessage;
  } catch (error) {
    return { error: error.message };
  }
};

const getMessages = async (conversationId) => {
  try {
    const messages = await Message.find({ conversationId }).populate(
      "senderId",
      "-password -conversations"
    );
    return messages;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  createContact,
  createConversation,
  getConversationByParticipants,
  getUserByEmail,
  getConversationById,
  createMessage,
  getMessages,
};
