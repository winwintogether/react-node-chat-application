import React, { useCallback, useEffect, useRef, useState } from "react";
import { RoomInterface, MessageInterface } from "../../interfaces/Room";
import { Socket } from "socket.io-client";

const Chat: React.FC<{
  socket: Socket;
  roomData: RoomInterface;
}> = (props) => {
  const [canSendMessage, setCanSendMessage] = useState(false);
  const [messageValue, setMessageValue] = useState("");
  const [messages, setMessages] = useState<MessageInterface[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageValue(e.target.value);
    setCanSendMessage(e.target.value.trim().length > 0 ? true : false);
  };
  const handleReceiveMessage = useCallback((data: MessageInterface) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  }, []);

  useEffect(() => {
    props.socket.on("receive_message", handleReceiveMessage);

    return () => {
      props.socket.off("receive_message", handleReceiveMessage);
    };
  }, [props.socket, handleReceiveMessage]);

  const sendMessage = async () => {
    const newMessageData: MessageInterface = {
      names: props.roomData.names,
      room: props.roomData.room,
      message: messageValue,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    await props.socket.emit("send_message", newMessageData);
    setMessageValue("");
    setCanSendMessage(false);
  };

  return (
    <div>
      <h6>Live chat</h6>
      <div>
        {messages.map((message) => (
          <h2>Message: {message.message}</h2>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="your message..."
          value={messageValue}
          onChange={handleInputChange}
        />
        <button onClick={sendMessage} disabled={!canSendMessage}>
          &#9658;
        </button>
      </div>
    </div>
  );
};

export default Chat;
