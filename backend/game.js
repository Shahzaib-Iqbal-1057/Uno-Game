"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game = /** @class */ (function () {
    function Game(players, io, num_players) {
        var _this = this;
        this.users = [];
        this.deck_card = { name: "", value: 0, color: "" };
        this.user_cards = [];
        this.turn = 0;
        this.uno_reverse_flag = false;
        this.room_number = 0;
        this.io = undefined;
        this.num_players = 0;
        this.deck = [{ name: 'card num-1 red', value: 1, color: "red" }, { name: 'card num-2 red', value: 2, color: "red" },
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
            { name: 'card wild', value: 0, color: "wild" }, { name: 'card wild', value: 0, color: "wild" }];
        this.checkUser = function (id) {
            for (var i = 0; i < _this.num_players; i++) {
                if (_this.users[i].id === id) {
                    return true;
                }
            }
            return false;
        };
        this.sendMessage = function (message) {
            for (var i = 0; i < _this.num_players; i++) {
                _this.io.to(_this.users[i].id).emit("message", message);
            }
        };
        this.homePage = function () {
            for (var i = 0; i < _this.num_players; i++) {
                _this.io.to(_this.users[i].id).emit("homepage");
            }
        };
        this.sendData = function () {
            var _loop_1 = function (i) {
                var _a, _b;
                var all_names = _this.users.map(function (x) { return x.name; });
                var cards = [];
                for (var i_1 = 0; i_1 < 8; i_1++) {
                    var random_1 = Math.floor(Math.random() * _this.deck.length);
                    cards.push(_this.deck[random_1]);
                    _this.deck.splice(random_1, 1);
                }
                if (_this.num_players === 4) {
                    if (i === 1) {
                        var _c = [all_names[2], all_names[3]], third_element = _c[0], fourth_element = _c[1];
                        _a = [fourth_element, third_element], all_names[2] = _a[0], all_names[3] = _a[1];
                    }
                    if (i === 2) {
                        var _d = [all_names[0], all_names[1]], first_element = _d[0], second_element = _d[1];
                        _b = [second_element, first_element], all_names[0] = _b[0], all_names[1] = _b[1];
                    }
                }
                if (_this.num_players === 3) {
                    all_names[3] = "";
                }
                if (_this.num_players === 2) {
                    if (i === 0) {
                        all_names[2] = all_names[1];
                        all_names[1] = "";
                    }
                    if (i === 1) {
                        all_names[1] = all_names[0];
                        all_names[0] = "";
                    }
                    all_names[3] = "";
                }
                _this.user_cards.push({ id: _this.users[i].id, cards: cards });
                _this.io.to(_this.users[i].id).emit("player_names", { my_name: _this.users[i].name, other_player_names: all_names.filter(function (x) { return x !== _this.users[i].name; }) });
                _this.io.to(_this.users[i].id).emit("cards", cards);
            };
            for (var i = 0; i < _this.num_players; i++) {
                _loop_1(i);
            }
            var random = Math.floor(Math.random() * _this.deck.length);
            for (var i = 0; i < _this.num_players; i++) {
                _this.io.to(_this.users[i].id).emit("deck_card", _this.deck[random]);
            }
            _this.deck_card = _this.deck[random];
            for (var i = 0; i < _this.num_players; i++) {
                _this.io.to(_this.users[i].id).emit("turn", _this.users[_this.turn].name);
            }
            _this.deck.splice(random, 1);
        };
        this.cardCompatibility = function (card) {
            if (_this.deck_card.color === "wild" || card.color === "wild") {
                return true;
            }
            if (_this.deck_card.color === card.color) {
                return true;
            }
            if (card.name.split(' ')[1].split('-')[0] === "num" && _this.deck_card.name.split(' ')[1].split('-')[0] === "num" && card.value === _this.deck_card.value) {
                return true;
            }
            return false;
        };
        this.giveDrawCards = function (index, value) {
            if (_this.uno_reverse_flag) {
                if (index === 0 && _this.num_players === 4) {
                    index = 3;
                }
                else if (index === 0 && _this.num_players === 3) {
                    index = 2;
                }
                else if (index === 0 && _this.num_players === 2) {
                    index = 1;
                }
                else {
                    index--;
                }
                _this.user_cards = _this.user_cards.map(function (x) {
                    if (x.id === _this.users[(index) % _this.num_players].id) {
                        for (var i = 0; i < value; i++) {
                            var random = Math.floor(Math.random() * _this.deck.length);
                            x.cards.push(_this.deck[random]);
                            _this.deck.splice(random, 1);
                        }
                        _this.io.to(_this.users[(index) % _this.num_players].id).emit("cards", x.cards);
                        return x;
                    }
                    else {
                        return x;
                    }
                });
            }
            else {
                _this.user_cards = _this.user_cards.map(function (x) {
                    if (x.id === _this.users[(index + 1) % _this.num_players].id) {
                        for (var i = 0; i < value; i++) {
                            var random = Math.floor(Math.random() * _this.deck.length);
                            x.cards.push(_this.deck[random]);
                            _this.deck.splice(random, 1);
                        }
                        _this.io.to(_this.users[(index + 1) % _this.num_players].id).emit("cards", x.cards);
                        return x;
                    }
                    else {
                        return x;
                    }
                });
            }
        };
        this.calculateNextTurn = function (card) {
            if (card.color === "wild") {
                return _this.turn;
            }
            if (_this.uno_reverse_flag) {
                if (card.name.split(' ')[1].split('-')[0] === "num") {
                    if (_this.turn - 1 < 0 && _this.num_players === 4) {
                        return 3;
                    }
                    else if (_this.turn - 1 < 0 && _this.num_players === 3) {
                        return 2;
                    }
                    else if (_this.turn - 1 < 0 && _this.num_players === 2) {
                        return 1;
                    }
                    else {
                        return _this.turn - 1;
                    }
                }
                if (card.name.split(' ')[1] === "reverse") {
                    _this.uno_reverse_flag = !_this.uno_reverse_flag;
                    return _this.turn + 1;
                }
                if (card.name.split(' ')[1] === "skip" || card.name.split(' ')[1].split('-')[0] === "draw") {
                    _this.turn = _this.turn - 2;
                    if (_this.num_players === 4) {
                        if (_this.turn === -1) {
                            return 3;
                        }
                        if (_this.turn === -2) {
                            return 2;
                        }
                    }
                    if (_this.num_players === 3) {
                        if (_this.turn === -1) {
                            return 2;
                        }
                        if (_this.turn === -2) {
                            return 1;
                        }
                    }
                    if (_this.num_players === 2) {
                        if (_this.turn === -1) {
                            return 1;
                        }
                        if (_this.turn === -2) {
                            return 0;
                        }
                    }
                    return _this.turn;
                }
            }
            else {
                if (card.name.split(' ')[1].split('-')[0] === "num") {
                    return _this.turn + 1;
                }
                if (card.name.split(' ')[1] === "skip" || card.name.split(' ')[1].split('-')[0] === "draw") {
                    return _this.turn + 2;
                }
                if (card.name.split(' ')[1] === "reverse") {
                    if (_this.turn - 1 < 0 && _this.num_players === 4) {
                        _this.turn = 3;
                    }
                    else if (_this.turn - 1 < 0 && _this.num_players === 3) {
                        _this.turn = 2;
                    }
                    else if (_this.turn - 1 < 0 && _this.num_players === 2) {
                        _this.turn = 1;
                    }
                    else {
                        _this.turn--;
                    }
                    _this.uno_reverse_flag = !_this.uno_reverse_flag;
                    return _this.turn;
                }
            }
            return _this.turn;
        };
        this.putCardOnDeck = function (card, id) {
            if (_this.users[_this.turn % _this.num_players].id !== id) {
                return;
            }
            if (_this.cardCompatibility(card)) {
                for (var i = 0; i < _this.num_players; i++) {
                    _this.io.to(_this.users[i].id).emit("deck_card", card);
                }
                _this.deck_card = card;
                _this.user_cards = _this.user_cards.map(function (x) {
                    if (x.id === id) {
                        for (var i = 0; i < x.cards.length; i++) {
                            if (x.cards[i].name === card.name && x.cards[i].value === card.value) {
                                x.cards.splice(i, 1);
                                break;
                            }
                        }
                        _this.io.to(id).emit("cards", x.cards);
                        return x;
                    }
                    else {
                        return x;
                    }
                });
                if (card.name.split(' ')[1].split('-')[0] === "draw") {
                    _this.giveDrawCards(_this.turn, card.value);
                }
                if (_this.user_cards[_this.turn % _this.num_players].cards.length === 0) {
                    for (var i = 0; i < _this.num_players; i++) {
                        _this.io.to(_this.users[i].id).emit("winner", _this.users[_this.turn % _this.num_players].name);
                    }
                    return true;
                }
                if (_this.user_cards[_this.turn % _this.num_players].cards.length === 1) {
                    for (var i = 0; i < _this.num_players; i++) {
                        _this.io.to(_this.users[i].id).emit("message", { message: "Uno!", name: _this.users[_this.turn % _this.num_players].name });
                    }
                }
                _this.turn = _this.calculateNextTurn(card);
                _this.io.emit("turn", _this.users[_this.turn % _this.num_players].name);
                for (var i = 0; i < _this.num_players; i++) {
                    _this.io.to(_this.users[i].id).emit("turn", _this.users[_this.turn % _this.num_players].name);
                }
            }
            return false;
        };
        this.getCardFromDeck = function (id) {
            if (_this.users[_this.turn % _this.num_players].id !== id) {
                return;
            }
            _this.user_cards = _this.user_cards.map(function (x) {
                if (x.id === id) {
                    var random = Math.floor(Math.random() * _this.deck.length);
                    x.cards.push(_this.deck[random]);
                    _this.deck.splice(random, 1);
                    _this.io.to(id).emit("cards", x.cards);
                    return x;
                }
                else {
                    return x;
                }
            });
            if (!_this.uno_reverse_flag) {
                _this.turn++;
            }
            else {
                _this.turn--;
                if (_this.turn < 0 && _this.num_players === 4) {
                    _this.turn = 3;
                }
                if (_this.turn < 0 && _this.num_players === 3) {
                    _this.turn = 2;
                }
                if (_this.turn < 0 && _this.num_players === 2) {
                    _this.turn = 1;
                }
            }
            for (var i = 0; i < _this.num_players; i++) {
                _this.io.to(_this.users[i].id).emit("turn", _this.users[_this.turn % _this.num_players].name);
            }
        };
        this.io = io;
        players.map(function (player) {
            _this.users.push(player);
        });
        this.num_players = num_players;
    }
    return Game;
}());
exports.default = Game;
