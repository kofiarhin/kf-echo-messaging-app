const Conversation = require("../models/conversationModel");
const Message = require("../models/messagesModel");
const User = require("../models/userModel");

// get user conversations
const getUserConversations = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate("participants", "-password -conversations")
      .populate("lastMessage")
      .sort({ lastMessageCreatedAt: -1 });

    const mappedConversations = conversations?.map((convo) => {
      const { participants, ...rest } = convo;
      const contact = participants.find(
        (p) => p._id.toString() !== userId.toString()
      );
      return { contact, ...rest._doc };
    });
    return res.json(mappedConversations);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserConversations,
};
