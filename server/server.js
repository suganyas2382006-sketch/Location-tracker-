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

const PORT = process.env.PORT || 8080;

server.listen(PORT,()=>{

console.log(
`Server running on ${PORT}`
);

});
