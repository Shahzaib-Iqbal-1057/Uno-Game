import {io} from "socket.io-client";
const socket = io('https://uno-game-vtdp.onrender.com/',{ transports: ["websocket"] });
socket.connect()
export default socket;