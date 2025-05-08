const Message = require("../models/messagesModel");
const helper = require("../services/helper");

const getMessages = async (req, res, next) => {
  try {
    const { conversationId } = req.params;

    const messages = await helper.getMessages(conversationId);

    return res.json(messages);
  } catch (error) {
    next(error);
  }
};

module.exports = { getMessages };
