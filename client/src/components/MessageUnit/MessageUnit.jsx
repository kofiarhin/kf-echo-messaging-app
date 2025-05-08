import { useSelector } from "react-redux";

const MessageUnit = ({ data }) => {
  const { user } = useSelector((state) => state.auth);

  const check = data.senderId._id === user._id;

  console.log(check);
  return (
    <div
      className={`chat-bubble ${
        user._id === data.senderId._id ? "sent" : "received"
      }`}
    >
      {data.message}
    </div>
  );
};

export default MessageUnit;
