import React from "react";
import { io } from "socket.io-client";

import './App.css';
import JoinChat from "./components/chat/JoinChat";

const socket = io("http://localhost:5000");

const App: React.FC = () => {
  return (
    <div className="appContainer">
      <h1>Welcome to chat application</h1>

      <JoinChat />
    </div>
  );
};

export default App;
