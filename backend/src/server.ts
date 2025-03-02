import { Socket } from "socket.io";
import express from "express";
const app = express();
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import Events from "./events";
import mongoose from "mongoose";
app.use(cors());
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });

const server = http.createServer(app);
const origin = process.env.ORIGIN || "http://localhost:5173";
const io = new Server(server, {
    cors: {
        origin: origin,
        methods: ["GET", "POST"],
    },
});

const mongoUri = process.env.MONG_URI;
if (!mongoUri) {
    throw new Error("MONG_URI is not defined in the environment variables");
}

mongoose
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
    Events(io);
});