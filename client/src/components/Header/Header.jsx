import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import "./header.styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logoutUser = async () => {
    try {
      const res = await fetch("/api/auth/logout");

      if (!res.ok) {
        throw new Error("unable to logout user");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };
  //mutations
  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      localStorage.removeItem("user");
      dispatch(setCurrentUser(null));
      navigate("/login");
    },
  });
  const handleLogout = () => {
    mutation.mutate();
  };
  return (
    <header className="header">
      <div className="logo">Logo</div>
      <nav className="nav-links">
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/contacts">Contacts</Link>
            <Link to="/users">Users</Link>
            <Link to="/chat">Chat</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            {" "}
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
