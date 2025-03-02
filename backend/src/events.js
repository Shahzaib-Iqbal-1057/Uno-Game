"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var room_1 = require("./models/room");
var uuid_1 = require("uuid");
var events = function (io) {
    io.on("connection", function (socket) {
        console.log("User joined with ID : ", socket.id);
        // When a player joins a room
        socket.on("joinRoom", function (data) { return __awaiter(void 0, void 0, void 0, function () {
            var name, maxPlayers, room;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = data.name, maxPlayers = data.maxPlayers;
                        return [4 /*yield*/, room_1.Room.findOne({
                                maxPlayers: maxPlayers,
                                playersJoined: { $lt: maxPlayers },
                            })];
                    case 1:
                        room = _a.sent();
                        if (!!room) return [3 /*break*/, 3];
                        return [4 /*yield*/, room_1.Room.create({
                                roomId: (0, uuid_1.v4)(),
                                maxPlayers: maxPlayers,
                                playersJoined: 0,
                                players: [],
                            })];
                    case 2:
                        // Create a new room if no suitable room is found
                        room = _a.sent();
                        _a.label = 3;
                    case 3:
                        // Add player to the room
                        room.players.push({ id: socket.id, name: name });
                        room.playersJoined += 1;
                        return [4 /*yield*/, room.save()];
                    case 4:
                        _a.sent();
                        // Join the room via Socket.IO
                        socket.join(room.roomId);
                        // Emit room update to all players in the room
                        io.to(room.roomId).emit("roomUpdate", {
                            roomId: room.roomId,
                            playersJoined: room.playersJoined,
                            maxPlayers: room.maxPlayers,
                            players: room.players,
                        });
                        console.log("Player ".concat(name, " joined room ").concat(room.roomId, " (").concat(room.playersJoined, "/").concat(room.maxPlayers, ")"));
                        // Handle player disconnect
                        socket.on("disconnect", function () { return __awaiter(void 0, void 0, void 0, function () {
                            var currentRoom;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log("Player ".concat(name, " disconnected"));
                                        return [4 /*yield*/, room_1.Room.findOne({ "players.id": socket.id })];
                                    case 1:
                                        currentRoom = _a.sent();
                                        if (!currentRoom) return [3 /*break*/, 3];
                                        // Notify everyone that the game is over
                                        io.to(currentRoom.roomId).emit("gameOver", {
                                            message: "The game has ended because a player left.",
                                        });
                                        // Delete the room since the game cannot continue
                                        return [4 /*yield*/, room_1.Room.deleteOne({ roomId: currentRoom.roomId })];
                                    case 2:
                                        // Delete the room since the game cannot continue
                                        _a.sent();
                                        // Remove all players from the room
                                        io.socketsLeave(currentRoom.roomId);
                                        console.log("Room ".concat(currentRoom.roomId, " closed due to player exit."));
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        }); });
    });
};
exports.default = events;
