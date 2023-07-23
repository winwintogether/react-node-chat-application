import React from "react";
import '../../App.css'

const JoinChat: React.FC = () => {
  return (
    <div className="joinChatContainer">
      <h3>Join a chat</h3>
      <div className="form">
        <input type="text" placeholder="your name" />
        <input type="text" placeholder="room" />
        <button>Join a room</button>
      </div>
    </div>
  );
};

export default JoinChat;
