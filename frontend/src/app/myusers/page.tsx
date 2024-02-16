"use client";

import { useState, useEffect, useMemo } from "react";
import "./styles/MyUsers.scss";
import axios from "axios";

//used to establish connection between socket (front end back)
import { io } from "socket.io-client";
import Chat from "../../../components/Chat";

const backendUrl = process.env.NEXT_PUBLIC_RESOURCE_API_URL as string;

// const socket = io(backendUrl);

interface ChatInfos {
  socketId: string;
  name: string;
  room: string;
}

const MyUsers = () => {
  const socket = useMemo(() => io(backendUrl), []);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");

  const [isJoinedRoom, setIsJoinedRoom] = useState(false);

  const connectionInfos: ChatInfos = {
    socketId: socketId,
    name: name,
    room: room,
  };

  const joinRoom = () => {
    if (connectionInfos.name && connectionInfos.room) {
      // alert("success");
      setIsJoinedRoom(true);
      socket.emit("join_room", connectionInfos);
      socket.on("get_socket_id", (socket_id) => {
        setSocketId(socket_id);
        console.log("page.tsx", socket_id);
      });
    } else {
      setIsJoinedRoom(false);
      alert("please fill in all inputs");
    }
  };

  return (
    <main id="MyUsers">
      {!isJoinedRoom ? (
        <>
          <h1 className="title">Join a chat</h1>
          <div className="inputsAndBtn">
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
            <button className="btn_join_room" onClick={() => joinRoom()}>
              Join
            </button>
          </div>
        </>
      ) : (
        <Chat socket={socket} connectionInfos={connectionInfos} />
      )}
    </main>
  );
};

export default MyUsers;
