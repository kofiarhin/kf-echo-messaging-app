import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const registerUser = async (userData) => {
    try {
      const res = await fetch(`/api/auth/register`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        throw new Error("there was a problem registering");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const mutation = useMutation({
    mutationFn: (data) => registerUser(data),
    onSuccess: (data) => {
      navigate("/login");
      console.log("user registered");
    },
  });

  const [form, setForm] = useState({
    name: "test",
    email: "test@gmail.com",
    password: "password",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register submitted:", form);
    // Submit form to backend
    mutation.mutate({
      name: form.name,
      email: form.email,
      password: form.password,
    });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={form.name}
          onChange={handleChange}
          required
        />

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

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
