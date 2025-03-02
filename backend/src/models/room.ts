import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
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

export const Room = mongoose.model("Room", roomSchema);

