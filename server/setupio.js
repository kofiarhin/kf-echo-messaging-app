const helper = require("./services/helper");

const setupIo = (io) => {
  // when server is connected
  io.on("connection", (socket) => {
    socket.on("send_message", async (data) => {
      const newMessage = await helper.createMessage({
        conversationId: data.conversationId,
        senderId: data.senderId,
        message: data.message,
      });

      io.to(data.conversationId).emit("new_message", data);
    });
    socket.on("join", (conversationId) => {
      socket.join(conversationId);
      console.log("joined", conversationId);
    });

    console.log("client connected");
  });
};

module.exports = setupIo;
