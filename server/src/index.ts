require("dotenv").config();
const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
      origin: "*"
    }
  });
import {Socket} from "socket.io";

io.on("connection", (socket: Socket) => {
    console.log("new user!");
    socket.on("disconnect", (reason)=>{
        console.log("user left reason:", reason);
    });

    socket.on("message", (data)=>{
        socket.broadcast.emit("message", data);
    });
});

const port = process.env.PORT || 3000;
server.listen(port, ()=>{
    console.log("listening on port: " + port);
});
