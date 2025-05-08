import { useSelector } from "react-redux";
import AddButton from "../AddButton/AddButton";
import "./userUnit.styles.scss";
import useContacts from "../../hooks/useContacts";
import SendMessageButton from "../SendMessageButton/SendMessageButton";
import { useEffect } from "react";

const UserUnit = ({ data }) => {
  const { data: contactsData } = useContacts();

  useEffect(() => {}, [contactsData]);

  const renderButton = (data) => {
    if (contactsData && contactsData.length > 0) {
      const check = contactsData.some(
        (item) => item._id.toString() === data._id.toString()
      );
      return check ? (
        <SendMessageButton data={data} />
      ) : (
        <AddButton data={data} />
      );
    }
    return <AddButton data={data} />;
  };

  return (
    <div className="user-unit">
      <h2> {data.name} </h2>
      <p> {data.email} </p>
      {renderButton(data)}
    </div>
  );
};

export default UserUnit;
