const express = require("express");
const app = express();
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")

const port = process.env.PORT || 4450

app.use(cors())

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page Of Backend Server")
})

app.get("/users", (req, res) => {
  res.send(usersData)
})


const server = http.createServer(app)

server.listen(port, () => {
  console.log("Server is running at port " + port)
})

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "*",
    methods: ["GET", "POST"]
  }
})

//on connection get socket then handle

io.on("connection", (socket) => {
  console.log(`User is connected  : ${socket.id}`);

  socket.on("join_room", (connectionInfos) => {
    socket.join(connectionInfos.room)
    console.log([
      {
        id : socket.id , 
        name : connectionInfos.name , 
        room : connectionInfos.room , 
        isJoined : true
      }
    ]);

    io.to(connectionInfos.room).emit("get_socket_id" , socket.id)
  })

  socket.on("send_message" , (messageData) => { 
    console.log("SOCKET ON messageData RROM" + messageData.room);
    socket.to(messageData.room).emit("receive_message" , messageData)
  })

  socket.on("disconnect", () => {
    console.log("User disconnect : " + socket.id)
  })
})