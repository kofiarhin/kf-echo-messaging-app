import { useState } from "react";
import useSocket from "../../hooks/useSocket";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

const MessageInput = () => {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("testing mic one two");
  const { currentContact } = useSelector((state) => state.contacts);
  const { user } = useSelector((state) => state.auth);
  const { socket } = useSocket();

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    socket.emit("send_message", {
      conversationId: currentContact.conversationId,
      message,
      senderId: user._id,
      type: "text",
    });
    queryClient.invalidateQueries(["Conversations"]);
    setMessage("");
  };

  return (
    <>
      <input
        type="text"
        placeholder="Type a message"
        onChange={handleChange}
        value={message}
      />
      <button onClick={handleSendMessage}>Send</button>
    </>
  );
};

export default MessageInput;
