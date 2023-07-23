import React, { useCallback, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { RoomInterface, MessageInterface } from "../../interfaces/Room";
import "../../App.css";

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

  const sendMessage = () => {
    const newMessageData: MessageInterface = {
      names: props.roomData.names,
      room: props.roomData.room,
      message: messageValue,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    props.socket.emit("send_message", newMessageData);
    setMessages((prevMessages) => [...prevMessages, newMessageData]);
    setMessageValue("");
    setCanSendMessage(false);
  };

  return (
    <div className="chatContainer">
      <div className="header">
        <p>Live Chat {props.roomData.names} <span>active now</span></p>
      </div>
      <div className="body">
        <ScrollToBottom className="message-container">
          {messages.map((message) => {
            return (
              <div
                className="message"
                id={props.roomData.names === message.names ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{message.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{message.time}</p>
                    <p id="author">
                      {props.roomData.names === message.names
                        ? "you"
                        : message.names}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={messageValue}
          placeholder="Hey..."
          onChange={handleInputChange}
        />
        <button disabled={!canSendMessage} onClick={sendMessage}>
          &#9658;
        </button>
      </div>
    </div>
  );
};

export default Chat;
