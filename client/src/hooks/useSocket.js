import io from "socket.io-client";

const socket = io.connect("http://https://kf-echo-messaging-app.onrender.com");
const useSocket = () => {
  return { socket };
};

export default useSocket;
