"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const events_1 = __importDefault(require("./events"));
const mongoose_1 = __importDefault(require("mongoose"));
app.use((0, cors_1.default)());
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + "/../.env" });
const server = http_1.default.createServer(app);
const origin = process.env.ORIGIN || "http://localhost:5173";
const io = new socket_io_1.Server(server, {
    cors: {
        origin: origin,
        methods: ["GET", "POST"],
    },
});
const mongoUri = process.env.MONG_URI;
if (!mongoUri) {
    throw new Error("MONG_URI is not defined in the environment variables");
}
mongoose_1.default
    .connect(mongoUri)
    .then(() => {
    console.log("Connected to the database");
})
    .catch((error) => {
    console.log(error);
});
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log("SERVER IS LISTENING ON PORT 3001");
    (0, events_1.default)(io);
});
