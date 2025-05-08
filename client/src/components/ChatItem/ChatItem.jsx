import "./chatItem.styles.scss";
import { useDispatch } from "react-redux";
import { setCurrentContact } from "../../redux/contacts/contactsSlice";
import useSocket from "../../hooks/useSocket";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

// chat item
const ChatItem = ({ item }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const conversationId = item._id;

  useEffect(() => {
    socket.emit("join", conversationId);
  }, [socket, conversationId]);

  const handleCurrentContact = () => {
    queryClient.invalidateQueries({ queryKey: ["messages"] });

    const { contact, _id: conversationId, ...rest } = item;
    dispatch(setCurrentContact({ ...contact, conversationId }));
  };
  return (
    <div onClick={handleCurrentContact} className="chat-item">
      <p> {item?.contact?.name} </p>
      <p> {item?.lastMessage?.message} </p>
    </div>
  );
};

export default ChatItem;
