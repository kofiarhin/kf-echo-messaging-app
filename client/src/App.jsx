import useSocket from "./hooks/useSocket";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Login from "./Pages/Login/Login";
import Chat from "./Pages/Chat/Chat";
import Header from "./components/Header/Header";
import Register from "./Pages/Register/Register";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Profile from "./Pages/Profile/Profile";
import Contacts from "./Pages/Contacts/Contacts";
import { useSelector } from "react-redux";
import useContacts from "./hooks/useContacts";
import Users from "./Pages/Users/Users";
import { useQueryClient } from "@tanstack/react-query";
// app
const App = () => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on("new_message", (data) => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    });
  }, [socket]);

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
