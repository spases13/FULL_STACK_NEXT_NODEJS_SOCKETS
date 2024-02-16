"use client";

import { useState, useEffect } from "react";
import "./styles/MyUsers.scss";
import axios from "axios";

//used to establish connection between socket (front end back)
import { io } from "socket.io-client";
import Chat from "../../../components/Chat";

const backendUrl = process.env.NEXT_PUBLIC_RESOURCE_API_URL as string;

const socket = io(backendUrl);

interface ChatInfos {
  name: string;
  room: string;
}

const MyUsers = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const connectionInfos: ChatInfos = {
    name: name,
    room: room,
  };

  const joinRoom = () => {
    if (connectionInfos.name && connectionInfos.room) {
      alert("success");
      socket.emit("join_room", connectionInfos);
    } else {
      alert("please fill in all inputs");
    }
  };

  return (
    <main id="MyUsers">
      {/* <h1 className="text-center my-8">Join a chat</h1>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        name="name"
      />
      <input
        type="text"
        onChange={(e: any) => setRoom(e.target.value)}
        placeholder="Room ID"
        name="room"
      />
      <button onClick={() => joinRoom()}>Join a room</button> */}

      <Chat socket={socket} connectionInfos={connectionInfos} />
    </main>
  );
};

export default MyUsers;
