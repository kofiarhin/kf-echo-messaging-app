const User = require("../models/userModel");
const Contact = require("../models/contactModel");
const Conversation = require("../models/conversationModel");

// get contacts
const getContacts = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const contacts = await Contact.find({ userId }).populate("contactId");

    if (!contacts) {
      res.status(400);
      throw new Error("contacts not found");
    }
    if (contacts.length > 0) {
      const dataToSend = await Promise.all(
        contacts.map(async (item) => {
          // get conversation ids
          const conversation = await Conversation.findOne({
            participants: { $all: [userId, item.contactId._id] },
          });
          const { _id: conversationId } = conversation;
          return {
            conversationId,
            name: item.contactId.name,
            email: item.contactId.email,
            _id: item.contactId._id,
          };
        })
      );
      return res.json(dataToSend);
    }
    return res.json([]);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { _id: contactId, name, email } = req.body;

  //  create new contact
  const contact = await Contact.create({
    userId,
    contactId,
  });
  // create new conversation
  const conversation = await Conversation.create({
    participants: [userId, contactId],
  });
  const { _id: conversationId } = conversation;
  // update user conversations
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    {
      $push: { conversations: conversationId },
    },
    { new: true }
  );
  // return data { _id, conversationId, name, email }
  return res.json({ _id: contactId, name, email, conversationId });
};

module.exports = { createContact, getContacts };
