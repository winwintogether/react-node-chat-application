import React from "react";
import { io } from "socket.io-client";

import "./App.css";
import JoinChat from "./components/chat/JoinChat";
import { RoomInterface } from "./interfaces/Room";

const socket = io("http://localhost:5000");

const App: React.FC = () => {
  const joinRoomHandler = (roomData: RoomInterface) => {
    socket.emit("join_room", roomData);
  };
  return (
    <div className="appContainer">
      <h1>Welcome to chat application</h1>

      <JoinChat onJoinRoom={joinRoomHandler}/>
    </div>
  );
};

export default App;
