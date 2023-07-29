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
        origin:3001,
        methods: ["GET", "POST"]
    },
})
let two_queue : User[] = [];
let three_queue : User[] = [];
let four_queue : User[] = [];

let games : Game[] = [];

server.listen(3001, ()=>{
    console.log("SERVER IS LISTENING ON PORT 3001")
})
io.on("connection",(socket : any)=>{
    console.log("User joined with ID : ", socket.id);
    socket.on("username",(data:{user:string,players:number})=>{
        console.log("data : ",data," socket id : ",socket.id);
        if(data.players===2)
        {
            two_queue.push({name : data.user,id : socket.id})
        }
        if(data.players===3)
        {
            three_queue.push({name : data.user,id : socket.id})
        }
        if(data.players===4)
        {
            four_queue.push({name : data.user,id : socket.id})
        }

        setTimeout(()=> {
            let player_array : User[] = [];
            let flag : boolean = false;
            if(four_queue.length === 4)
            {
                for(let i = 0; i < 4; i++)
                {
                    player_array.push(four_queue.shift()!);
                }
                let game : Game = new Game(player_array,io,4);
                games.push(game);
                games[games.length-1].homePage();
                setTimeout(()=>{games[games.length-1].sendData()},500);
                flag = true;
            }
            if(three_queue.length === 3)
            {
                for(let i = 0; i < 3; i++)
                {
                    player_array.push(three_queue.shift()!);
                }
                let game : Game = new Game(player_array,io,3);
                games.push(game);
                games[games.length-1].homePage();
                setTimeout(()=>{games[games.length-1].sendData()},500);
                flag = true;
            }
            if(two_queue.length === 2)
            {
                for(let i = 0; i < 2; i++)
                {
                    player_array.push(two_queue.shift()!);
                }
                let game : Game = new Game(player_array,io,2);
                games.push(game);
                games[games.length-1].homePage();
                setTimeout(()=>{games[games.length-1].sendData()},500);
                flag = true;
            }

            if(!flag)
            {
                if(data.players === 2)
                {
                    for(let i = 0; i < two_queue.length; i++)
                    {
                        io.to(two_queue[i].id).emit("num_players",two_queue.length);
                    }
                }
                if(data.players === 3)
                {
                    for(let i = 0; i < three_queue.length; i++)
                    {
                        io.to(three_queue[i].id).emit("num_players",three_queue.length);
                    }
                }
                if(data.players === 4)
                {
                    for(let i = 0; i < four_queue.length; i++)
                    {
                        io.to(four_queue[i].id).emit("num_players",four_queue.length);
                    }
                }

            }

        },350)
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
                if(games[i].putCardOnDeck(card,socket.id))
                {
                    games.splice(i,1);
                }
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
    socket.on('disconnect-client', () => {
        console.log('Client with socket id', socket.id, 'disconnected.');
        socket.disconnect(true); // true parameter means a close packet will be sent to the client
    });
    socket.on("disconnet",()=>{
        socket.disconnect();
    })

})























