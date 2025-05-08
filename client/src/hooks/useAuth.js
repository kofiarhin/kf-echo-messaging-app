import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  const handleSetUser = (data) => {
    //  dispath user
    console.log("dispatch user");
  };

  return {
    message: "get user",
    onSetUser: (data) => handleSetUser(data),
  };
};

export default useAuth;
