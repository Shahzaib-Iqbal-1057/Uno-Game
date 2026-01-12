"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = require("./models/room");
const uuid_1 = require("uuid");
const cards_1 = require("./cards");
const cards_2 = require("./cards");
const currentTurns = {};
const cardCompatibility = (playerCard, centerCard) => {
    if (centerCard.color === "wild" || playerCard.color === "wild")
        return true;
    if (centerCard.color === playerCard.color)
        return true;
    if (playerCard.name.split(' ')[1].split('-')[0] === "num" &&
        centerCard.name.split(' ')[1].split('-')[0] === "num" &&
        playerCard.value === centerCard.value)
        return true;
    return false;
};
const getNextPlayerIndex = (currentIndex, numPlayers, reverse, step = 1) => {
    if (reverse) {
        return (currentIndex - step + numPlayers) % numPlayers;
    }
    else {
        return (currentIndex + step) % numPlayers;
    }
};
const events = (io) => {
    io.on("connection", (socket) => {
        console.log("User joined with ID : ", socket.id);
        // When a player joins a room
        socket.on("joinRoom", async (data) => {
            const { name, maxPlayers } = data;
            let room = await room_1.Room.findOne({
                maxPlayers: maxPlayers,
                playersJoined: { $lt: maxPlayers },
            });
            if (!room) {
                // Create a new room if no suitable room is found
                room = await room_1.Room.create({
                    roomId: (0, uuid_1.v4)(),
                    maxPlayers: maxPlayers,
                    playersJoined: 0,
                    players: [],
                    remainingDeck: (0, cards_2.shuffleDeck)(cards_1.deck)
                });
            }
            // Add player to the room
            room.players.push({ id: socket.id, name });
            room.playersJoined += 1;
            await room.save();
            // Join the room via Socket.IO
            socket.join(room.roomId);
            // Emit room update to all players in the room
            io.to(room.roomId).emit("roomUpdate", {
                roomId: room.roomId,
                playersJoined: room.playersJoined,
                maxPlayers: room.maxPlayers,
                players: room.players,
            });
            console.log(`Player ${name} joined room ${room.roomId} (${room.playersJoined}/${room.maxPlayers})`);
            if (room.playersJoined === room.maxPlayers) {
                const randomPlayerIndex = Math.floor(Math.random() * room.players.length);
                const randomPlayer = room.players[randomPlayerIndex];
                let shuffledDeck = room.remainingDeck;
                const playerCards = {};
                room.players.forEach((player) => {
                    playerCards[player.id] = shuffledDeck.splice(0, 8); // Give each player 8 cards
                });
                const centerCard = shuffledDeck.shift();
                room.remainingDeck = shuffledDeck;
                currentTurns[room.roomId] = {
                    turn: randomPlayerIndex,
                    centerCard: centerCard,
                    reverse: false,
                };
                await room.save();
                io.to(room.roomId).emit("gameStart", {
                    roomId: room.roomId,
                    currentTurn: randomPlayer.name,
                });
                // wait for some time and then share the player names
                setTimeout(() => {
                    io.to(room.roomId).emit("playerNamesAndCards", {
                        players: room.players.map((p) => p.name),
                        playerCards: playerCards,
                        centerCard: centerCard
                    });
                    // Send "How to Play" message when the game starts
                    io.to(room.roomId).emit("receiveMessage", {
                        sender: "Shahzaib",
                        message: "Welcome to UNO! This is a chatbox which you can use to interact with other players. Apart from that, I created this game with the rules i knew, just try to match the color or number, if you end up using a skip card or a plus card, it will skip the turn of the next player, some rules might differ from the original game, but the main idea is the same. Enjoy the game!",
                    });
                }, 300);
            }
            // Only send message to other people in the room
            socket.on("sendMessage", (data) => {
                const { name, message, roomId } = data;
                socket.broadcast.to(roomId).emit("receiveMessage", {
                    sender: name,
                    message: message,
                });
            });
            socket.on("playCard", async (data) => {
                const { roomId, card } = data;
                const room = await room_1.Room.findOne({ roomId });
                if (!room)
                    return;
                const currentTurnData = currentTurns[roomId];
                if (!currentTurnData)
                    return;
                const currentPlayer = room.players[currentTurnData.turn];
                if (currentPlayer.id !== socket.id)
                    return;
                const centerCard = currentTurnData.centerCard;
                if (!cardCompatibility(card, centerCard))
                    return;
                currentTurnData.centerCard = card;
                io.to(room.roomId).emit("updateCenterCard", {
                    centerCard: currentTurnData.centerCard,
                });
                io.to(socket.id).emit("removePlayedCard", {
                    card: card,
                });
                const numPlayers = room.players.length;
                const skipNext = card.name.includes("skip");
                const isDrawCard = card.name.includes("draw");
                const isReverseCard = card.name.includes("reverse");
                if (isReverseCard) {
                    currentTurnData.reverse = !currentTurnData.reverse; // ✅ Toggle reverse mode
                }
                if (isDrawCard) {
                    const drawAmount = parseInt(card.name.split("-")[1]) || 2;
                    const nextPlayerIndex = getNextPlayerIndex(currentTurnData.turn, numPlayers, currentTurnData.reverse, 1);
                    const nextPlayer = room.players[nextPlayerIndex];
                    const cardsToGive = room.remainingDeck.splice(0, drawAmount);
                    io.to(nextPlayer.id).emit("receiveMultipleCards", {
                        cards: cardsToGive,
                    });
                    currentTurnData.turn = getNextPlayerIndex(currentTurnData.turn, numPlayers, currentTurnData.reverse, 2);
                }
                else {
                    const skipCount = skipNext ? 2 : 1;
                    currentTurnData.turn = getNextPlayerIndex(currentTurnData.turn, numPlayers, currentTurnData.reverse, skipCount);
                }
                const nextPlayer = room.players[currentTurnData.turn];
                io.to(room.roomId).emit("turnChange", {
                    currentTurn: nextPlayer.name,
                });
            });
            socket.on("pickFromDeck", async (data) => {
                const { roomId } = data;
                const room = await room_1.Room.findOne({ roomId });
                if (!room)
                    return;
                const currentTurnData = currentTurns[roomId];
                if (!currentTurnData)
                    return;
                const currentPlayer = room.players[currentTurnData.turn];
                if (currentPlayer.id !== socket.id)
                    return;
                if (room.remainingDeck.length === 0)
                    return;
                const pickedCard = room.remainingDeck.shift();
                if (!pickedCard)
                    return;
                await room.save();
                io.to(socket.id).emit("receiveCardFromDeck", { card: pickedCard });
                currentTurnData.turn = getNextPlayerIndex(currentTurnData.turn, room.players.length, currentTurnData.reverse, 1);
                const nextPlayer = room.players[currentTurnData.turn];
                io.to(room.roomId).emit("turnChange", {
                    currentTurn: nextPlayer.name,
                });
            });
            socket.on("unoSignal", async (data) => {
                const { roomId } = data;
                const room = await room_1.Room.findOne({ roomId });
                if (!room)
                    return;
                const player = room.players.find((p) => p.id === socket.id);
                if (!player)
                    return;
                io.to(roomId).emit("receiveMessage", {
                    sender: player.name,
                    message: "UNO!",
                });
            });
            socket.on("playerWon", async (data) => {
                const { roomId } = data;
                const room = await room_1.Room.findOne({ roomId });
                if (!room)
                    return;
                const player = room.players.find((p) => p.id === socket.id);
                if (!player)
                    return;
                // Notify winner
                io.to(socket.id).emit("winnerNotification");
                // Notify other players
                socket.broadcast.to(room.roomId).emit("gameOverNotification", {
                    winner: player.name,
                });
                delete currentTurns[roomId];
            });
            socket.on("playerWon", async (data) => {
                const { roomId } = data;
                const room = await room_1.Room.findOne({ roomId });
                if (!room)
                    return;
                const player = room.players.find((p) => p.id === socket.id);
                if (!player)
                    return;
                // Notify winner
                io.to(socket.id).emit("winnerNotification");
                // Notify other players
                socket.broadcast.to(room.roomId).emit("gameOverNotification", {
                    winner: player.name,
                });
                delete currentTurns[roomId];
            });
            socket.on("disconnect", async () => {
                console.log(`Player ${name} disconnected`);
                const currentRoom = await room_1.Room.findOne({ "players.id": socket.id });
                if (!currentRoom)
                    return;
                const roomId = currentRoom.roomId;
                const gameHasStarted = !!currentTurns[roomId]; // ✅ key idea
                if (!gameHasStarted) {
                    //remove player + decrement count, do NOT end room
                    currentRoom.players.pull({ id: socket.id });
                    currentRoom.playersJoined = Math.max(0, currentRoom.playersJoined - 1);
                    await currentRoom.save();
                    // If everybody left, delete room
                    if (currentRoom.playersJoined === 0) {
                        await room_1.Room.deleteOne({ roomId });
                        console.log(`Room ${roomId} deleted (empty lobby).`);
                        return;
                    }
                    // Notify remaining players in lobby
                    io.to(roomId).emit("roomUpdate", {
                        roomId,
                        playersJoined: currentRoom.playersJoined,
                        maxPlayers: currentRoom.maxPlayers,
                        players: currentRoom.players,
                    });
                    console.log(`Lobby update: ${roomId} (${currentRoom.playersJoined}/${currentRoom.maxPlayers})`);
                    return;
                }
                io.to(roomId).emit("gameOver", {
                    message: `The game has ended because a player left.`,
                });
                await room_1.Room.deleteOne({ roomId });
                delete currentTurns[roomId];
                io.socketsLeave(roomId);
                console.log(`Room ${roomId} closed due to player exit (in-game).`);
            });
        });
    });
};
exports.default = events;
