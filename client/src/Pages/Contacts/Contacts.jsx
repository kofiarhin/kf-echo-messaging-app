import useContacts from "../../hooks/useContacts";
import ContactItem from "../../components/ContactItem/ContactItem";
import "./contacts.styles.scss";

const Contacts = () => {
  const { data: contactsData, isLoading, isError } = useContacts();

  if (isLoading)
    return (
      <>
        {" "}
        <h1 className="heading">Loading....</h1>{" "}
      </>
    );
  return (
    <div className="contacts-wrapper">
      {contactsData?.map((contact) => (
        <ContactItem data={contact} />
      ))}
    </div>
  );
};

export default Contacts;
