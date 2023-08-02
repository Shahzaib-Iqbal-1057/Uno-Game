import {io} from "socket.io-client";
const socket = io('localhost:3001',{ transports: ["websocket"] });
socket.connect()
export default socket;