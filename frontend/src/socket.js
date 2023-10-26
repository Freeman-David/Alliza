import io from "socket.io-client";
import { BASE_URL } from "./config";

let socket;

const connectSocket = (userId) => {
  socket = io(BASE_URL, {
    query: `user_id=${userId}`,
  });
};

export { connectSocket, socket };
