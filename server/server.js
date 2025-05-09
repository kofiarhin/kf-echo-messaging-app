// Import dependencies
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const connectDB = require("./config/db");
const setupIo = require("./setupio");

// Import services
const { sendMessage } = require("./services/helper");

// Configuration
const PORT = process.env.PORT || 5000;
const CORS_OPTIONS = {
  origin: "https://kf-echo-messaging-app.onrender.com",
  methods: ["GET", "POST", "PUT"],
};

// Connect to the database
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with CORS options
const io = new Server(server, { cors: CORS_OPTIONS });

// Setup Socket.IO event handlers
setupIo(io);

// Start the server
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
