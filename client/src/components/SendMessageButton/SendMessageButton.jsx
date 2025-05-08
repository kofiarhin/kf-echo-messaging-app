import { setCurrentContact } from "../../redux/contacts/contactsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const SendMessageButton = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSendMessage = () => {
    dispatch(setCurrentContact(data));
    navigate("/chat");
  };
  return <button onClick={handleSendMessage}>Send Message</button>;
};

export default SendMessageButton;
