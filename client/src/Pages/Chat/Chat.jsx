import "./chat.styles.css";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useContacts from "../../hooks/useContacts";
import MessageInput from "../../components/MessageInput/MessageInput";
import ChatItem from "../../components/ChatItem/ChatItem";
import useMessages from "../../hooks/useMessages";
import useSocket from "../../hooks/useSocket";
import MessageList from "../../components/MessageList/MessageList";
import {
  setContacts,
  setCurrentContact,
} from "../../redux/contacts/contactsSlice";
import useConversation from "../../hooks/useConversation";

// chat
const Chat = () => {
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { user } = useSelector((state) => state.auth);
  const { currentContact } = useSelector((state) => state.contacts);
  const { data: conversationData, error } = useConversation(user._id);

  const { data: messagesData, isLoading: messageLoading } = useMessages();

  console.log(conversationData);

  if (messageLoading) {
    return (
      <>
        <h1 className="he3">Loading....</h1>{" "}
      </>
    );
  }

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">Chats</div>
        {conversationData && conversationData.length > 0 && (
          <>
            <div className="contact-list">
              {conversationData?.map((convo, i) => (
                <ChatItem key={convo._id} item={convo} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Chat Window */}
      <div className="chat-window">
        <div className="chat-header"> {currentContact?.name} </div>
        <div className="chat-messages">
          {messagesData !== undefined && <MessageList data={messagesData} />}
        </div>

        <div className="chat-input-bar">
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default Chat;
