const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
      origin: "*"
    }
  });
import {Socket} from "socket.io";


const users: string[] = [];

io.on("connection", (socket: Socket) => {
    const username = socket.handshake.query.username;
    if(typeof username !== "string" || username.length < 2){
        socket.disconnect();
        return;
    }
    users.push(username);
    socket.emit("connected", {users});
    io.emit("join", {username, users});

    
    socket.on("disconnect", (reason)=>{
        users.splice(users.indexOf(username), 1);
        io.emit("left", {username, users});
    });

    socket.on("message", (data)=>{
        socket.broadcast.emit("message", {
            content: data.content,
            username: username
        });
    });
});

server.listen(3000, ()=>{
    console.log("connected");
});
