import React, { useState } from "react";
import { io, Socket } from "socket.io-client";

import JoinChat from "./components/chat/JoinChat";
import { RoomInterface } from "./interfaces/Room";
import Chat from "./components/chat/Chat";
import "./App.css";

const socket: Socket = io("http://localhost:5000");

const App: React.FC = () => {
  const [userData, setUserData] = useState<RoomInterface>();
  const [showChat, setShowChat] = useState(false);

  const joinRoomHandler = (roomData: RoomInterface) => {
    setUserData(roomData);
    socket.emit("join_room", roomData);
    setShowChat(true);
  };

  return (
    <div className="appContainer">
      <h1>Welcome to chat application</h1>
      {!showChat ? (
        <JoinChat onJoinRoom={joinRoomHandler} />
      ) : (
        <Chat socket={socket} roomData={userData!} />
      )}
    </div>
  );
};

export default App;
