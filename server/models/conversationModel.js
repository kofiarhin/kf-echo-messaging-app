const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    lastMessageCreatedAt: {
      type: Date,
      deafult: null,
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    participants: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
