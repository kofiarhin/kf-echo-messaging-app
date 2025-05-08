const app = require("./app");
const { Server } = require("socket.io");
const http = require("http");
const connectDB = require("./config/db");
const server = http.createServer(app);
const { sendMessage } = require("./services/helper");
const setupIo = require("./setupio");

// connect to database
connectDB();

// setup socket io and run setup function
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST", "PUT"],
  },
});

setupIo(io);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("server started");
});
