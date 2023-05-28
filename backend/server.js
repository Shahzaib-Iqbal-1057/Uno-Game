"use strict";
exports.__esModule = true;
var Socket = require("socket.io").Socket;
var express = require("express");
var app = express();
var http = require("http");
var Server = require('socket.io').Server;
var cors = require('cors');
app.use(cors());
var server = http.createServer(app);
var io = new Server(server, { cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
});
server.listen(3001, function () {
    console.log("SERVER IS LISTENING ON PORT 3001");
});
function getTurn(card_name, reverse, turn) {
    if (reverse) {
        if (card_name.split(' ')[1] === "skip") {
            if (turn === 1) {
                turn = 3;
            }
            else if (turn === 0) {
                turn = 2;
            }
            else {
                turn = turn - 2;
            }
        }
        else {
            if (turn === 0) {
                turn = 3;
            }
            else {
                turn--;
            }
        }
    }
    else {
        if (card_name.split(' ')[1] === "skip") {
            turn = turn + 2;
        }
        else {
            turn = turn + 1;
        }
    }
    return turn;
}
var users = [];
var deck = [
    { name: 'card num-0 red', value: 0 }, { name: 'card num-1 red', value: 1 }, { name: 'card num-2 red', value: 2 },
    { name: 'card num-3 red', value: 3 }, { name: 'card num-5 red', value: 5 }, { name: 'card num-6 red', value: 6 },
    { name: 'card num-7 red', value: 7 }, { name: 'card num-8 red', value: 8 }, { name: 'card num-9 red', value: 9 },
    { name: 'card num-1 red', value: 1 }, { name: 'card num-2 red', value: 2 }, { name: 'card num-3 red', value: 3 },
    { name: 'card num-4 red', value: 4 }, { name: 'card num-5 red', value: 5 }, { name: 'card num-6 red', value: 6 },
    { name: 'card num-7 red', value: 7 }, { name: 'card num-8 red', value: 8 }, { name: 'card num-9 red', value: 9 },
    { name: 'card num-0 blue', value: 0 }, { name: 'card num-1 blue', value: 1 },
    { name: 'card num-2 blue', value: 2 }, { name: 'card num-3 blue', value: 3 }, { name: 'card num-4 blue', value: 4 },
    { name: 'card num-5 blue', value: 5 }, { name: 'card num-6 blue', value: 6 }, { name: 'card num-7 blue', value: 7 },
    { name: 'card num-8 blue', value: 8 }, { name: 'card num-9 blue', value: 9 },
    { name: 'card num-1 blue', value: 1 }, { name: 'card num-2 blue', value: 2 }, { name: 'card num-3 blue', value: 3 },
    { name: 'card num-4 blue', value: 4 }, { name: 'card num-6 blue', value: 6 }, { name: 'card num-7 blue', value: 7 },
    { name: 'card num-8 blue', value: 8 }, { name: 'card num-9 blue', value: 9 }, { name: 'card num-1 yellow', value: 1 },
    { name: 'card num-2 yellow', value: 2 }, { name: 'card num-3 yellow', value: 3 }, { name: 'card num-4 yellow', value: 4 },
    { name: 'card num-5 yellow', value: 5 }, { name: 'card num-6 yellow', value: 6 }, { name: 'card num-7 yellow', value: 7 },
    { name: 'card num-8 yellow', value: 8 }, { name: 'card num-9 yellow', value: 9 }, { name: 'card num-1 yellow', value: 1 },
    { name: 'card num-2 yellow', value: 2 }, { name: 'card num-3 yellow', value: 3 }, { name: 'card num-4 yellow', value: 4 },
    { name: 'card num-5 yellow', value: 5 }, { name: 'card num-6 yellow', value: 6 }, { name: 'card num-7 yellow', value: 7 },
    { name: 'card num-8 yellow', value: 8 }, { name: 'card num-9 yellow', value: 9 }, { name: 'card num-0 green', value: 0 },
    { name: 'card num-2 green', value: 2 }, { name: 'card num-3 green', value: 3 }, { name: 'card num-4 green', value: 4 },
    { name: 'card num-5 green', value: 5 }, { name: 'card num-6 green', value: 6 }, { name: 'card num-7 green', value: 7 },
    { name: 'card num-8 green', value: 8 }, { name: 'card num-9 green', value: 9 }, { name: 'card num-1 green', value: 1 },
    { name: 'card num-2 green', value: 2 }, { name: 'card num-3 green', value: 3 }, { name: 'card num-4 green', value: 4 },
    { name: 'card num-6 green', value: 6 }, { name: 'card num-7 green', value: 7 }, { name: 'card num-8 green', value: 8 },
    { name: 'card num-9 green', value: 9 }, { name: 'card skip red', value: 0 }, { name: 'card skip blue', value: 0 },
    { name: 'card skip green', value: 0 }, { name: 'card skip green', value: 0 }, { name: 'card skip yellow', value: 0 },
    { name: 'card skip yellow', value: 0 }, { name: 'card reverse red', value: 0 }, { name: 'card reverse red', value: 0 },
    { name: 'card reverse blue', value: 0 }, { name: 'card reverse blue', value: 0 }, { name: 'card reverse green', value: 0 },
    { name: 'card reverse green', value: 0 }, { name: 'card reverse yellow', value: 0 }, { name: 'card reverse yellow', value: 0 },
    { name: 'card draw-2 red', value: 2 }, { name: 'card draw-4 red', value: 4 }, { name: 'card draw-2 blue', value: 2 },
    { name: 'card draw-4 blue', value: 4 }, { name: 'card draw-2 green', value: 2 }, { name: 'card draw-4 green', value: 4 },
    { name: 'card draw-4 yellow', value: 4 }, { name: 'card wild', value: 0 }, { name: 'card wild', value: 0 },
    { name: 'card wild', value: 0 }, { name: 'card wild', value: 0 }
];
var temp = deck.slice();
var ready_players = [];
var turn = 0;
var reverse = false;
io.on("connection", function (socket) {
    console.log("user connected with a socket id", socket.id);
    socket.on("username", function (name) {
        var player = { name: name, id: socket.id };
        var player_ready = { id: socket.id, ready: false, left: false };
        ready_players.push(player_ready);
        users.push(player);
        if (users.length === 4) {
            io.emit("homepage", "");
        }
    });
    socket.on("ready", function (name) {
        var _a, _b;
        for (var i = 0; i < ready_players.length; i++) {
            if (ready_players[i].id == socket.id) {
                ready_players[i].ready = true;
            }
        }
        var flag = true;
        for (var i = 0; i < ready_players.length; i++) {
            if (ready_players[i].ready == false) {
                flag = false;
            }
        }
        if (flag) {
            for (var i = 0; i < users.length; i++) {
                var other_names = [];
                for (var j = 0; j < users.length; j++) {
                    if (i != j) {
                        other_names.push(users[j].name);
                    }
                }
                if (i === 1) {
                    _a = [other_names[2], other_names[1]], other_names[1] = _a[0], other_names[2] = _a[1];
                }
                if (i === 2) {
                    _b = [other_names[1], other_names[0]], other_names[0] = _b[0], other_names[1] = _b[1];
                }
                io.to(users[i].id).emit("playerData", { my_name: users[i].name, other_names: other_names });
            }
            for (var i = 0; i < users.length; i++) {
                var cards = [];
                for (var j = 0; j < 8; j++) {
                    var random_1 = Math.floor(Math.random() * deck.length);
                    cards.push(deck[random_1]);
                    deck.splice(random_1, 1);
                }
                io.to(ready_players[i].id).emit("cards", cards);
            }
            var random = Math.floor(Math.random() * deck.length);
            io.emit("cardOnDeck", deck[random]);
            io.emit("turn", users[turn % 4].name);
            deck.splice(random, 1);
        }
    });
    socket.on("cardOnDeck", function (data) {
        io.emit("cardOnDeck", data);
        if (data.name == "card wild") {
            io.emit("turn", users[turn % 4].name);
        }
        else {
            if (data.name.split(' ')[1] === "reverse") {
                reverse = !reverse;
            }
            turn = getTurn(data.name, reverse, turn);
            if (data.name.split(' ')[1].split('-')[0] === "draw") {
                for (var i = 0; i < data.value; i++) {
                    var random = Math.floor(Math.random() * deck.length);
                    io.to(ready_players[turn % 4].id).emit("getCardFromDeck", deck[random]);
                    deck.splice(random, 1);
                }
                turn = getTurn(data.name, reverse, turn);
            }
            io.emit("turn", users[turn % 4].name);
        }
    });
    socket.on("sendMessage", function (data) {
        socket.broadcast.emit("message", data);
    });
    socket.on("getCardFromDeck", function () {
        turn = getTurn("", reverse, turn);
        var random = Math.floor(Math.random() * deck.length);
        io.to(socket.id).emit("getCardFromDeck", deck[random]);
        io.emit("turn", users[turn % 4].name);
        deck.splice(random, 1);
    });
    socket.on("winner", function (winner) {
        socket.broadcast.emit("winner", winner);
    });
    socket.on('disconnect', function () {
        console.log('A user disconnected.');
        for (var i = 0; i < ready_players.length; i++) {
            if (ready_players[i].id == socket.id) {
                ready_players[i].left = true;
            }
        }
        var flag = true;
        for (var i = 0; i < ready_players.length; i++) {
            if (ready_players[i].left == false) {
                flag = false;
            }
        }
        if (flag) {
            deck = temp;
            users = [];
            ready_players = [];
        }
    });
});
