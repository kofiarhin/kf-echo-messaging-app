import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { setCurrentContact } from "../../redux/contacts/contactsSlice";
import { useDispatch } from "react-redux";
import "./addButton.styles.scss";

// add button
const AddButton = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createContact = async (contactData) => {
    try {
      const res = await fetch("/api/contacts", {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(contactData),
      });
      if (!res.ok) {
        throw new Error("something went wrong");
      }
      return await res.json();
    } catch (error) {
      return { error: error.message };
    }
  };

  const mutation = useMutation({
    mutationFn: (contactData) => createContact(contactData),
    mutationKey: ["contacts"],
    onSuccess: (data) => {
      navigate("/chat");
      dispatch(setCurrentContact(data));
    },
  });
  const handleAdd = async () => {
    // console.log(data);
    mutation.mutate(data);
  };
  return (
    <button onClick={handleAdd} className="add-button">
      {" "}
      Add To Contacts{" "}
    </button>
  );
};

export default AddButton;
