"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var cors_1 = require("cors");
var events_1 = require("./events");
var mongoose_1 = require("mongoose");
app.use((0, cors_1.default)());
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
    },
});
var mongoUri = process.env.MONG_URI;
if (!mongoUri) {
    throw new Error("MONG_URI is not defined in the environment variables");
}
mongoose_1.default.connect(mongoUri)
    .then(function () { console.log("Connected to the database"); })
    .catch(function (error) {
    console.log(error);
});
server.listen(3001, function () {
    console.log("SERVER IS LISTENING ON PORT 3001");
    (0, events_1.default)(io);
});
// const { Socket } = require( "socket.io");
// const express = require("express");
// const app = express();
// const http = require("http");
// const {Server} = require('socket.io')
// const cors = require('cors')
// // import Game from './game';
// app.use(cors())
// interface User{
//     name : string,
//     id : string
// }
// interface Card {
//     name : string,
//     value : number,
//     color : string
// }
// const server = http.createServer(app)
// const io = new Server(
//     server,{cors:{
//         origin:3001,
//         methods: ["GET", "POST"]
//     },
// })
// let two_queue : User[] = [];
// let three_queue : User[] = [];
// let four_queue : User[] = [];
// // let games : Game[] = [];
// server.listen(3001, ()=>{
//     console.log("SERVER IS LISTENING ON PORT 3001")
// })
// io.on("connection",(socket : any)=>{
//     console.log("User joined with ID : ", socket.id);
//     socket.on("username",(data:{user:string,players:number})=>{
//         console.log("data : ",data," socket id : ",socket.id);
//         if(data.players===2)
//         {
//             two_queue.push({name : data.user,id : socket.id})
//         }
//         if(data.players===3)
//         {
//             three_queue.push({name : data.user,id : socket.id})
//         }
//         if(data.players===4)
//         {
//             four_queue.push({name : data.user,id : socket.id})
//         }
//         setTimeout(()=> {
//             let player_array : User[] = [];
//             let flag : boolean = false;
//             if(four_queue.length === 4)
//             {
//                 for(let i = 0; i < 4; i++)
//                 {
//                     player_array.push(four_queue.shift()!);
//                 }
//                 // let game : Game = new Game(player_array,io,4);
//                 // games.push(game);
//                 // games[games.length-1].homePage();
//                 // setTimeout(()=>{games[games.length-1].sendData()},500);
//                 flag = true;
//             }
//             if(three_queue.length === 3)
//             {
//                 for(let i = 0; i < 3; i++)
//                 {
//                     player_array.push(three_queue.shift()!);
//                 }
//                 // let game : Game = new Game(player_array,io,3);
//                 // games.push(game);
//                 // games[games.length-1].homePage();
//                 // setTimeout(()=>{games[games.length-1].sendData()},500);
//                 flag = true;
//             }
//             if(two_queue.length === 2)
//             {
//                 for(let i = 0; i < 2; i++)
//                 {
//                     player_array.push(two_queue.shift()!);
//                 }
//                 // let game : Game = new Game(player_array,io,2);
//                 // games.push(game);
//                 // games[games.length-1].homePage();
//                 // setTimeout(()=>{games[games.length-1].sendData()},500);
//                 flag = true;
//             }
//             if(!flag)
//             {
//                 if(data.players === 2)
//                 {
//                     for(let i = 0; i < two_queue.length; i++)
//                     {
//                         io.to(two_queue[i].id).emit("num_players",two_queue.length);
//                     }
//                 }
//                 if(data.players === 3)
//                 {
//                     for(let i = 0; i < three_queue.length; i++)
//                     {
//                         io.to(three_queue[i].id).emit("num_players",three_queue.length);
//                     }
//                 }
//                 if(data.players === 4)
//                 {
//                     for(let i = 0; i < four_queue.length; i++)
//                     {
//                         io.to(four_queue[i].id).emit("num_players",four_queue.length);
//                     }
//                 }
//             }
//         },450)
// })
//     socket.on("message",(message : string)=>{
//         // for(let i = 0; i < games.length; i++)
//         {
//             // if(games[i].checkUser(socket.id))
//             {
//                 // games[i].sendMessage(message);
//             }
//         }
//     })
//     socket.on("card_selected",(card : Card)=>{
//         // for(let i = 0; i < games.length; i++)
//         // {
//         //     if(games[i].checkUser(socket.id))
//         //     {
//         //         if(games[i].putCardOnDeck(card,socket.id))
//         //         {
//         //             games.splice(i,1);
//         //         }
//         //     }
//         // }
//     })
//     socket.on("pick_from_deck",()=>{
//         // for(let i = 0; i < games.length; i++)
//         // {
//             // if(games[i].checkUser(socket.id))
//             // {
//                 // games[i].getCardFromDeck(socket.id);
//             // }
//         // }
//     })
//     socket.on("disconnet",()=>{
//         for(let i =0 ; i < two_queue.length; i++)
//         {
//             if(two_queue[i].id===socket.id)
//             {
//                 two_queue.splice(i,1);
//             }
//         }
//         for(let i =0 ; i < three_queue.length; i++)
//         {
//             if(three_queue[i].id===socket.id)
//             {
//                 three_queue.splice(i,1);
//             }
//         }
//         for(let i =0 ; i < four_queue.length; i++)
//         {
//             if(four_queue[i].id===socket.id)
//             {
//                 four_queue.splice(i,1);
//             }
//         }
//         socket.disconnect();
//     })
// })
