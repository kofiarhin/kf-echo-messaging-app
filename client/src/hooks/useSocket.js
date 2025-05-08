import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");
const useSocket = () => {
  return { socket };
};

export default useSocket;
