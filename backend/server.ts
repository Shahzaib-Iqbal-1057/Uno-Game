const { Socket } = require( "socket.io");
const express = require("express");
const app = express();
const http = require("http");
const {Server} = require('socket.io')
const cors = require('cors')
import Game from './game';
app.use(cors())

interface User{
    name : string,
    id : string
}
interface Card {
    name : string,
    value : number,
    color : string
}

const server = http.createServer(app)
const io = new Server(
    server,{cors:{
        methods: ["GET", "POST"]
    },
})
let queue : User[] = [];
let games : Game[] = [];

server.listen(3001, ()=>{
    console.log("SERVER IS LISTENING ON PORT 3001")
})
app.get("/", (req : any, res : any) => {
    res.json({ message: "Hello from server!" });
  });

io.on("connection",(socket : any)=>{
    console.log("User joined with ID : ", socket.id);
    socket.on("username",(data:string)=>{
        queue.push({name : data,id : socket.id});
        if(queue.length === 4)
        {
            let player_array : User[] = [];
            for(let i = 0; i < 4; i++)
            {
                player_array.push(queue.shift()!);
            }
            let game : Game = new Game(player_array,io);
            games.push(game);
            games[games.length-1].homePage();
            setTimeout(()=>{games[games.length-1].sendData()},500);
        }
    })
    socket.on("message",(message : string)=>{
        for(let i = 0; i < games.length; i++)
        {
            if(games[i].checkUser(socket.id))
            {
                games[i].sendMessage(message);
            }
        }
    })
    socket.on("card_selected",(card : Card)=>{
        for(let i = 0; i < games.length; i++)
        {
            if(games[i].checkUser(socket.id))
            {
                games[i].putCardOnDeck(card,socket.id);
            }
        }
    })
    socket.on("pick_from_deck",()=>{
        
        for(let i = 0; i < games.length; i++)
        {
            if(games[i].checkUser(socket.id))
            {
                games[i].getCardFromDeck(socket.id);
            }
        }
    })

})























