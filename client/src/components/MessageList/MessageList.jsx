import MessageUnit from "../MessageUnit/MessageUnit";

const MessageList = ({ data }) => {
  return (
    <>
      {data &&
        data.length > 0 &&
        data.map((item) => <MessageUnit data={item} key={item._id} />)}
    </>
  );
};

export default MessageList;
