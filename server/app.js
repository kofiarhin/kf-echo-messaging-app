const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const contactsRoutes = require("./routes/contactsRoutes");
const userRoutes = require("./routes/usersRoutes");
const verifyUser = require("./middlewares/verifyUser");
const messagesRoutes = require("./routes/messagesRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const path = require("path");

const app = express();

const staticPath = path.join(__dirname, ".", "dist");

// Middleware
app.use(express.static(staticPath));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use(verifyUser);
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/conversations", conversationRoutes);
if (process.env.NODE_ENV === "production") {
  app.get("/", (req, res) => {
    const filePath = path.join(__dirname, ".", "dist", "index.html");
    return res.sendFile(filePath);
  });
}
app.use(errorHandler);

module.exports = app;
