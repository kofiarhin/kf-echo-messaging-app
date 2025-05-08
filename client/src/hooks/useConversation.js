import { useQuery } from "@tanstack/react-query";

const getUserConversations = (userId) => {
  const getConversations = async () => {
    try {
      const res = await fetch(`/api/conversations/${userId}`);
      return await res.json();
    } catch (error) {
      return { error: error.message };
    }
  };

  const { data, isLoading, error } = useQuery({
    queryFn: getConversations,
    querykey: ["Conversations"],
  });
  return { data };
};

export default getUserConversations;
