"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
// src/models/Room.ts
var mongoose_1 = require("mongoose");
var roomSchema = new mongoose_1.default.Schema({
    roomId: { type: String, required: true, unique: true },
    playersJoined: { type: Number, default: 0 },
    maxPlayers: { type: Number, required: true },
    players: [
        {
            id: String,
            name: String,
            joinedAt: { type: Date, default: Date.now },
        },
    ],
});
exports.Room = mongoose_1.default.model("Room", roomSchema);
