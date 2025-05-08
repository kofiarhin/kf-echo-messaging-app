import { useQuery } from "@tanstack/react-query";
const useContacts = () => {
  const getContacts = async () => {
    try {
      const res = await fetch("/api/contacts");
      if (!res.ok) {
        throw new Error("something went wrong");
      }
      return await res.json();
    } catch (error) {
      return error.message;
    }
  };
  return useQuery({
    queryKey: ["contacts"],
    queryFn: () => getContacts(),
  });
};

export default useContacts;
