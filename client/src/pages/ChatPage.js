import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const ChatPage = ({ currentUser, targetUser }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    const msg = {
      senderId: currentUser._id,
      receiverId: targetUser._id,
      content: message,
    };
    socket.emit("send-message", msg);
    setChat((prev) => [...prev, msg]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive-message", (msg) => {
      if (msg.receiverId === currentUser._id) {
        setChat((prev) => [...prev, msg]);
      }
    });
    return () => socket.off("receive-message");
  }, []);

  return (
    <div className="chat-container">
      <h3>Chat with {targetUser.name}</h3>
      <div className="chat-box">
        {chat.map((msg, i) => (
          <div key={i} className={msg.senderId === currentUser._id ? "my-msg" : "their-msg"}>
            {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatPage;
