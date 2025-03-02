"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const roomSchema = new mongoose_1.default.Schema({
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
    remainingDeck: [
        {
            name: { type: String, required: true },
            value: { type: Number, required: true },
            color: { type: String, required: true },
        },
    ],
});
exports.Room = mongoose_1.default.model("Room", roomSchema);
