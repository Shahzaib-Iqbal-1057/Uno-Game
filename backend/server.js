"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    },
});
var two_queue = [];
var three_queue = [];
var four_queue = [];
var games = [];
server.listen(3001, function () {
    console.log("SERVER IS LISTENING ON PORT 3001");
});
io.on("connection", function (socket) {
    console.log("User joined with ID : ", socket.id);
    socket.on("username", function (data) {
        console.log("data : ", data, " socket id : ", socket.id);
        if (data.players === 2) {
            two_queue.push({ name: data.user, id: socket.id });
        }
        if (data.players === 3) {
            three_queue.push({ name: data.user, id: socket.id });
        }
        if (data.players === 4) {
            four_queue.push({ name: data.user, id: socket.id });
        }
        setTimeout(function () {
            var player_array = [];
            var flag = false;
            if (four_queue.length === 4) {
                for (var i = 0; i < 4; i++) {
                    player_array.push(four_queue.shift());
                }
                var game = new game_1.default(player_array, io, 4);
                games.push(game);
                games[games.length - 1].homePage();
                setTimeout(function () { games[games.length - 1].sendData(); }, 500);
                flag = true;
            }
            if (three_queue.length === 3) {
                for (var i = 0; i < 3; i++) {
                    player_array.push(three_queue.shift());
                }
                var game = new game_1.default(player_array, io, 3);
                games.push(game);
                games[games.length - 1].homePage();
                setTimeout(function () { games[games.length - 1].sendData(); }, 500);
                flag = true;
            }
            if (two_queue.length === 2) {
                for (var i = 0; i < 2; i++) {
                    player_array.push(two_queue.shift());
                }
                var game = new game_1.default(player_array, io, 2);
                games.push(game);
                games[games.length - 1].homePage();
                setTimeout(function () { games[games.length - 1].sendData(); }, 500);
                flag = true;
            }
            if (!flag) {
                if (data.players === 2) {
                    for (var i = 0; i < two_queue.length; i++) {
                        io.to(two_queue[i].id).emit("num_players", two_queue.length);
                    }
                }
                if (data.players === 3) {
                    for (var i = 0; i < three_queue.length; i++) {
                        io.to(three_queue[i].id).emit("num_players", three_queue.length);
                    }
                }
                if (data.players === 4) {
                    for (var i = 0; i < four_queue.length; i++) {
                        io.to(four_queue[i].id).emit("num_players", four_queue.length);
                    }
                }
            }
        }, 450);
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
                if (games[i].putCardOnDeck(card, socket.id)) {
                    games.splice(i, 1);
                }
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
    socket.on("disconnet", function () {
        for (var i = 0; i < two_queue.length; i++) {
            if (two_queue[i].id === socket.id) {
                two_queue.splice(i, 1);
            }
        }
        for (var i = 0; i < three_queue.length; i++) {
            if (three_queue[i].id === socket.id) {
                three_queue.splice(i, 1);
            }
        }
        for (var i = 0; i < four_queue.length; i++) {
            if (four_queue[i].id === socket.id) {
                four_queue.splice(i, 1);
            }
        }
        socket.disconnect();
    });
});
