import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const useMessages = () => {
  const { currentContact } = useSelector((state) => state.contacts);

  const getMessages = async () => {
    try {
      const res = await fetch(`/api/messages/${currentContact.conversationId}`);
      if (!res.ok) {
        throw new Error("something went wrong getting messages");
      }
      return await res.json();
    } catch (error) {
      console.log(error.message);
      return { error: error.message };
      console.log(error.message);
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: () => getMessages(),
    enabled: !!currentContact?.conversationId,
  });
  return { data, isLoading };
};

export default useMessages;
