import React, { useRef } from "react";
import { RoomInterface } from "../../interfaces/Room";
import "../../App.css";

const JoinChat: React.FC<{ onJoinRoom: (roomData: RoomInterface) => void }> = (
  props
) => {
  const namesRef = useRef<HTMLInputElement>(null);
  const roomRef = useRef<HTMLInputElement>(null);

  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      namesRef.current?.value.trim().length === 0 ||
      roomRef.current?.value.trim().length === 0
    ) {
      alert("Please fill all fields to join the room");
      return;
    }

    const newRoomData: RoomInterface = {
      names: namesRef.current!.value,
      roomId: roomRef.current!.value,
    };

    props.onJoinRoom(newRoomData);
  };
  return (
    <div className="joinChatContainer">
      <h3>Join a chat</h3>
      <form className="form" onSubmit={joinRoom}>
        <input type="text" placeholder="your name" ref={namesRef} />
        <input type="text" placeholder="room" ref={roomRef} />
        <button>Join a room</button>
      </form>
    </div>
  );
};

export default JoinChat;
