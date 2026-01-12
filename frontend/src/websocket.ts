import { io, Socket } from "socket.io-client";

const SERVER_URL =
  import.meta.env.VITE_BACKEND_URL?.trim() || "http://localhost:3001";

let socket: Socket | null = null;

export const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io(SERVER_URL, {
      transports: ["websocket"], // avoid polling issues in prod
      withCredentials: true,
    });
  }
  return socket;
};


export default initializeSocket;
