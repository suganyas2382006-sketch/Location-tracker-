const express=require("express");
const app=express();

const http=require("http");
const server=http.createServer(app);

const io=require("socket.io")(server);

app.use(express.static("public"));

io.on("connection",(socket)=>{

console.log("User connected");

socket.on("send-location",(data)=>{

socket.broadcast.emit(
"receive-location",
data
);

});

});

server.listen(3000,()=>{

console.log(
"Server running on 3000"
);

});
