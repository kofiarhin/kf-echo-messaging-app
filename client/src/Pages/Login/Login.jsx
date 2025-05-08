import React, { useState } from "react";
import "./login.styles.scss";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/auth/authSlice";

// login
const Login = () => {
  const dispatch = useDispatch();
  const { message: authMessage, onSetUser } = useAuth();
  const navigate = useNavigate();
  const loginUser = async (data) => {
    try {
      const res = await fetch("/api/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        return await res.json();
      }
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };
  const mutation = useMutation({
    mutationFn: (data) => loginUser(data),
    onSuccess: (data) => {
      console.log("success", data);
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(setCurrentUser(data));
      navigate("/chat");
    },
    onError: (data) => {
      console.log("error", data);
      console.log("something went wrong");
    },
  });
  const [form, setForm] = useState({
    email: "test@gmail.com",
    password: "password",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call login mutation
    mutation.mutate(form);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
