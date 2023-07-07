"use strict";
exports.__esModule = true;
var Socket = require("socket.io").Socket;
var express = require("express");
var app = express();
var http = require("http");
var Server = require('socket.io').Server;
var cors = require('cors');
var game_1 = require("./game");
app.use(cors());
var server = http.createServer(app);
var io = new Server(server, { cors: {
        origin: 3001,
        methods: ["GET", "POST"]
    }
});
var queue = [];
var games = [];
server.listen(3001, function () {
    console.log("SERVER IS LISTENING ON PORT 3001");
});
app.get("/", function (req, res) {
    res.json({ message: "Hello from server!" });
});
io.on("connection", function (socket) {
    console.log("User joined with ID : ", socket.id);
    socket.on("username", function (data) {
        queue.push({ name: data, id: socket.id });
        if (queue.length === 4) {
            var player_array = [];
            for (var i = 0; i < 4; i++) {
                player_array.push(queue.shift());
            }
            var game = new game_1["default"](player_array, io);
            games.push(game);
            games[games.length - 1].homePage();
            setTimeout(function () { games[games.length - 1].sendData(); }, 500);
        }
        else {
            for (var i = 0; i < queue.length; i++) {
                io.to(queue[i].id).emit("num_players", queue.length);
            }
        }
    });
    socket.on("message", function (message) {
        for (var i = 0; i < games.length; i++) {
            if (games[i].checkUser(socket.id)) {
                games[i].sendMessage(message);
            }
        }
    });
    socket.on("card_selected", function (card) {
        for (var i = 0; i < games.length; i++) {
            if (games[i].checkUser(socket.id)) {
                games[i].putCardOnDeck(card, socket.id);
            }
        }
    });
    socket.on("pick_from_deck", function () {
        for (var i = 0; i < games.length; i++) {
            if (games[i].checkUser(socket.id)) {
                games[i].getCardFromDeck(socket.id);
            }
        }
    });
});
