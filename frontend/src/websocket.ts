import { io, Socket } from 'socket.io-client';

const SERVER_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
const SOCKET_SERVER_URL = SERVER_URL;

let socket: Socket | null = null;

const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_SERVER_URL);
  }
  return socket;
};

export default initializeSocket;
