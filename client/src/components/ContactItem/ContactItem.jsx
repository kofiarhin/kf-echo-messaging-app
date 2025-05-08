import SendMessageButton from "../SendMessageButton/SendMessageButton";

const ContactItem = ({ data }) => {
  return (
    <div>
      <h2> {data.name} </h2>
      <p> {data.email} </p>
      <SendMessageButton data={data} />
    </div>
  );
};

export default ContactItem;
