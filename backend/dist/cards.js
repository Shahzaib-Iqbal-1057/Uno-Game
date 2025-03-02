"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleDeck = exports.deck = void 0;
const deck = [{ name: 'card num-1 red', value: 1, color: "red" }, { name: 'card num-2 red', value: 2, color: "red" },
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
    { name: 'card draw-4 yellow', value: 4, color: "yellow" }];
exports.deck = deck;
const shuffleDeck = (deck) => {
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    return shuffledDeck;
};
exports.shuffleDeck = shuffleDeck;
