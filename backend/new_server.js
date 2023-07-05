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
io.on("connection", function (socket) {
    console.log("User joined with ID : ", socket.id);
});
