// const { Socket } = require( "socket.io");
// const express = require("express");
// const app = express();
// const http = require("http");
// const {Server} = require('socket.io')
// const cors = require('cors')
// app.use(cors())
// const server = http.createServer(app)
// const io = new Server(
//     server,{cors:{
//         origin:"http://localhost:3001",
//         methods: ["GET", "POST"]
//     },
// })
server.listen(3001, function () {
    console.log("SERVER IS LISTENING ON PORT 3001");
});
var users = [];
var deck_card = { name: "", value: 0, color: "" };
var user_cards = [];
var turn = 0;
var uno_reverse_flag = false;
var deck = [
    { name: 'card num-1 red', value: 1, color: "red" }, { name: 'card num-2 red', value: 2, color: "red" },
    { name: 'card num-3 red', value: 3, color: "red" }, { name: 'card num-5 red', value: 5, color: "red" }, { name: 'card num-6 red', value: 6, color: "red" },
    { name: 'card num-7 red', value: 7, color: "red" }, { name: 'card num-8 red', value: 8, color: "red" }, { name: 'card num-9 red', value: 9, color: "red" },
    { name: 'card num-1 red', value: 1, color: "red" }, { name: 'card num-2 red', value: 2, color: "red" },
    { name: 'card num-3 red', value: 3, color: "red" }, { name: 'card num-5 red', value: 5, color: "red" }, { name: 'card num-6 red', value: 6, color: "red" },
    { name: 'card num-7 red', value: 7, color: "red" }, { name: 'card num-8 red', value: 8, color: "red" }, { name: 'card num-9 red', value: 9, color: "red" },
    { name: 'card num-1 blue', value: 1, color: "blue" }, { name: 'card num-2 blue', value: 2, color: "blue" },
    { name: 'card num-3 blue', value: 3, color: "blue" }, { name: 'card num-5 blue', value: 5, color: "blue" }, { name: 'card num-6 blue', value: 6, color: "blue" },
    { name: 'card num-7 blue', value: 7, color: "blue" }, { name: 'card num-8 blue', value: 8, color: "blue" }, { name: 'card num-9 blue', value: 9, color: "blue" },
    { name: 'card num-1 blue', value: 1, color: "blue" }, { name: 'card num-2 blue', value: 2, color: "blue" },
    { name: 'card num-3 blue', value: 3, color: "blue" }, { name: 'card num-5 blue', value: 5, color: "blue" }, { name: 'card num-6 blue', value: 6, color: "blue" },
    { name: 'card num-7 blue', value: 7, color: "blue" }, { name: 'card num-8 blue', value: 8, color: "blue" }, { name: 'card num-9 blue', value: 9, color: "blue" },
    { name: 'card num-1 yellow', value: 1, color: "yellow" }, { name: 'card num-2 yellow', value: 2, color: "yellow" },
    { name: 'card num-3 yellow', value: 3, color: "yellow" }, { name: 'card num-5 yellow', value: 5, color: "yellow" }, { name: 'card num-6 yellow', value: 6, color: "yellow" },
    { name: 'card num-7 yellow', value: 7, color: "yellow" }, { name: 'card num-8 yellow', value: 8, color: "yellow" }, { name: 'card num-9 yellow', value: 9, color: "yellow" },
    { name: 'card num-1 yellow', value: 1, color: "yellow" }, { name: 'card num-2 yellow', value: 2, color: "yellow" },
    { name: 'card num-3 yellow', value: 3, color: "yellow" }, { name: 'card num-5 yellow', value: 5, color: "yellow" }, { name: 'card num-6 yellow', value: 6, color: "yellow" },
    { name: 'card num-7 yellow', value: 7, color: "yellow" }, { name: 'card num-8 yellow', value: 8, color: "yellow" }, { name: 'card num-9 yellow', value: 9, color: "yellow" },
    { name: 'card num-1 yellow', value: 1, color: "yellow" }, { name: 'card num-2 yellow', value: 2, color: "yellow" },
    { name: 'card num-3 green', value: 3, color: "green" }, { name: 'card num-5 green', value: 5, color: "green" }, { name: 'card num-6 green', value: 6, color: "green" },
    { name: 'card num-7 green', value: 7, color: "green" }, { name: 'card num-8 green', value: 8, color: "green" }, { name: 'card num-9 green', value: 9, color: "green" },
    { name: 'card num-1 green', value: 1, color: "green" }, { name: 'card num-2 green', value: 2, color: "green" },
    { name: 'card num-3 green', value: 3, color: "green" }, { name: 'card num-5 green', value: 5, color: "green" }, { name: 'card num-6 green', value: 6, color: "green" },
    { name: 'card num-7 green', value: 7, color: "green" }, { name: 'card num-8 green', value: 8, color: "green" },
    { name: 'card num-9 green', value: 9, color: "green" }, { name: 'card skip red', value: 0, color: "red" }, { name: 'card skip red', value: 0, color: "red" }, { name: 'card skip blue', value: 0, color: "blue" },
    { name: 'card skip blue', value: 0, color: "blue" }, { name: 'card skip green', value: 0, color: "green" }, { name: 'card skip green', value: 0, color: "green" }, { name: 'card skip yellow', value: 0, color: "yellow" },
    { name: 'card skip yellow', value: 0, color: "yellow" }, { name: 'card reverse red', value: 0, color: "red" }, { name: 'card reverse red', value: 0, color: "red" }, { name: 'card reverse blue', value: 0, color: "blue" },
    { name: 'card reverse blue', value: 0, color: "blue" }, { name: 'card reverse green', value: 0, color: "green" }, { name: 'card reverse green', value: 0, color: "green" }, { name: 'card reverse yellow', value: 0, color: "yellow" },
    { name: 'card reverse yellow', value: 0, color: "yellow" },
    { name: 'card draw-two red', value: 2, color: "red" }, { name: 'card draw-4 red', value: 4, color: "red" }, { name: 'card draw-two blue', value: 2, color: "blue" },
    { name: 'card draw-4 blue', value: 4, color: "blue" }, { name: 'card draw-two green', value: 2, color: "green" }, { name: 'card draw-4 green', value: 4, color: "green" },
    { name: 'card draw-4 yellow', value: 4, color: "yellow" }, { name: 'card wild', value: 0, color: "wild" }, { name: 'card wild', value: 0, color: "wild" },
    { name: 'card wild', value: 0, color: "wild" }, { name: 'card wild', value: 0, color: "wild" }
];
var sendData = function () {
    var _loop_1 = function (i) {
        var _a, _b;
        var all_names = users.map(function (x) { return x.name; });
        var cards = [];
        for (var i_1 = 0; i_1 < 8; i_1++) {
            var random_1 = Math.floor(Math.random() * deck.length);
            cards.push(deck[random_1]);
            deck.splice(random_1, 1);
        }
        if (i === 1) {
            var _c = [all_names[2], all_names[3]], third_element = _c[0], fourth_element = _c[1];
            _a = [fourth_element, third_element], all_names[2] = _a[0], all_names[3] = _a[1];
        }
        if (i === 2) {
            var _d = [all_names[0], all_names[1]], first_element = _d[0], second_element = _d[1];
            _b = [second_element, first_element], all_names[0] = _b[0], all_names[1] = _b[1];
        }
        user_cards.push({ id: users[i].id, cards: cards });
        io.to(users[i].id).emit("player_names", { my_name: users[i].name, other_player_names: all_names.filter(function (x) { return x !== users[i].name; }) });
        io.to(users[i].id).emit("cards", cards);
    };
    for (var i = 0; i < 4; i++) {
        _loop_1(i);
    }
    var random = Math.floor(Math.random() * deck.length);
    io.emit("deck_card", deck[random]);
    deck_card = deck[random];
    io.emit("turn", users[turn].name);
    deck.splice(random, 1);
};
var cardCompatibility = function (card) {
    if (deck_card.color === "wild" || card.color === "wild") {
        return true;
    }
    if (deck_card.color === card.color) {
        return true;
    }
    if (card.name.split(' ')[1].split('-')[0] === "num" && deck_card.name.split(' ')[1].split('-')[0] === "num" && card.value === deck_card.value) {
        return true;
    }
    return false;
};
var giveDrawCards = function (index, value) {
    if (uno_reverse_flag) {
        if (index === 0) {
            index = 3;
        }
        else {
            index--;
        }
        user_cards = user_cards.map(function (x) {
            if (x.id === users[(index) % 4].id) {
                for (var i = 0; i < value; i++) {
                    var random = Math.floor(Math.random() * deck.length);
                    x.cards.push(deck[random]);
                    deck.splice(random, 1);
                }
                io.to(users[(index) % 4].id).emit("cards", x.cards);
                return x;
            }
            else {
                return x;
            }
        });
    }
    else {
        user_cards = user_cards.map(function (x) {
            if (x.id === users[(index + 1) % 4].id) {
                for (var i = 0; i < value; i++) {
                    var random = Math.floor(Math.random() * deck.length);
                    x.cards.push(deck[random]);
                    deck.splice(random, 1);
                }
                io.to(users[(index + 1) % 4].id).emit("cards", x.cards);
                return x;
            }
            else {
                return x;
            }
        });
    }
};
var calculateNextTurn = function (turn, card) {
    if (card.color === "wild") {
        return turn;
    }
    if (uno_reverse_flag) {
        if (card.name.split(' ')[1].split('-')[0] === "num") {
            if (turn - 1 < 0) {
                return 3;
            }
            else {
                return turn - 1;
            }
        }
        if (card.name.split(' ')[1] === "reverse") {
            uno_reverse_flag = !uno_reverse_flag;
            return turn + 1;
        }
        if (card.name.split(' ')[1] === "skip" || card.name.split(' ')[1].split('-')[0] === "draw") {
            turn = turn - 2;
            if (turn === -1) {
                return 3;
            }
            if (turn === -2) {
                return 2;
            }
            return turn;
        }
    }
    else {
        if (card.name.split(' ')[1].split('-')[0] === "num") {
            return turn + 1;
        }
        if (card.name.split(' ')[1] === "skip" || card.name.split(' ')[1].split('-')[0] === "draw") {
            return turn + 2;
        }
        if (card.name.split(' ')[1] === "reverse") {
            if (turn - 1 < 0) {
                turn = 3;
            }
            else {
                turn--;
            }
            uno_reverse_flag = !uno_reverse_flag;
            return turn;
        }
    }
    return turn;
};
var putCardOnDeck = function (card, id) {
    if (users[turn % 4].id !== id) {
        return;
    }
    if (cardCompatibility(card)) {
        io.emit("deck_card", card);
        deck_card = card;
        user_cards = user_cards.map(function (x) {
            if (x.id === id) {
                for (var i = 0; i < x.cards.length; i++) {
                    if (x.cards[i].name === card.name && x.cards[i].value === card.value) {
                        x.cards.splice(i, 1);
                        break;
                    }
                }
                io.to(id).emit("cards", x.cards);
                return x;
            }
            else {
                return x;
            }
        });
        if (card.name.split(' ')[1].split('-')[0] === "draw") {
            giveDrawCards(turn, card.value);
        }
        if (user_cards[turn % 4].cards.length === 0) {
            io.emit("winner", users[turn % 4].name);
        }
        if (user_cards[turn % 4].cards.length === 1) {
            io.emit("message", { message: "Uno!", name: users[turn % 4].name });
        }
        turn = calculateNextTurn(turn, card);
        io.emit("turn", users[turn % 4].name);
    }
};
var getCardFromDeck = function (id) {
    if (users[turn % 4].id !== id) {
        return;
    }
    user_cards = user_cards.map(function (x) {
        if (x.id === id) {
            var random = Math.floor(Math.random() * deck.length);
            x.cards.push(deck[random]);
            deck.splice(random, 1);
            io.to(id).emit("cards", x.cards);
            return x;
        }
        else {
            return x;
        }
    });
    if (!uno_reverse_flag) {
        turn++;
    }
    else {
        turn--;
        if (turn < 0) {
            turn = 3;
        }
    }
    io.emit("turn", users[turn % 4].name);
};
io.on("connection", function (socket) {
    console.log("User joined with ID : ", socket.id);
    socket.on("username", function (data) {
        users.push({ name: data, id: socket.id });
        if (users.length === 4) {
            io.emit("homepage");
            setTimeout(function () { return sendData(); }, 500);
        }
    });
    socket.on("message", function (message) {
        io.emit("message", message);
    });
    socket.on("card_selected", function (card) {
        putCardOnDeck(card, socket.id);
    });
    socket.on("pick_from_deck", function () {
        getCardFromDeck(socket.id);
    });
});
