import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
const useUsers = () => {
  const [data, setData] = useState(null);

  const getUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) {
        throw new Error("there was a problem fetching users");
      }

      return await res.json();
    } catch (error) {
      return error.message;
    }
  };

  const {
    data: usersData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  useEffect(() => {
    if (usersData) {
      setData(usersData);
    }
  }, [usersData]);
  return { data: usersData, isLoading, isError };
};

export default useUsers;
