const express = require('express');
const {Server} = require("socket.io");
const app = express();
const http = require('http');
const server = http.createServer(app);

const io = new Server(server);



app.use(express.static("public"));

let userList = [];

io.on("connection", function(socket){
    console.log(socket.id, "user connected");
    socket.on("userConnected", function(username){
        let cellObj = {id: socket.id, username: username};
        userList.push(cellObj);
    })

    socket.on("cellinfo", function(cellCoordinates){
        console.log(cellCoordinates)
        let username;
        for(let i = 0; i<userList.length; i++){
            if(userList[i].id == socket.id){
                username = userList[i].username;
            }
        }
        
        socket.broadcast.emit('realtime', {username, ...cellCoordinates});
    })

    socket.on("cellValue", function(value){
        socket.broadcast.emit("setCellValue", value);
    })
   
})

server.listen(3000, function(){

})