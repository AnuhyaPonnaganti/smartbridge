// ✅ Chat.js with avatars, chat list, and message history
import React, { useEffect, useState, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import './Chat.css';

//const socket = io('https://skillbridge-backend.onrender.com'); // change URL if deployed
const socket = io("https://skillbridge-backend.onrender.com", {
  transports: ['websocket'], // force proper protocol
});
const Chat = ({ user }) => {
  const [receiver, setReceiver] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (user?._id) {
      socket.emit('join', user._id);
      fetchUserList();
    }
  }, [user]);

  const fetchUserList = async () => {
    try {
      const res = await fetch("https://skillbridge-backend.onrender.com/api/users")
      const data = await res.json();
      setUserList(data.filter(u => u._id !== user._id));
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchMessages = async (otherUser) => {
    try {
      const res = await fetch(`https://skillbridge-backend.onrender.com/api/messages/${user._id}/${otherUser._id}`);
      const data = await res.json();
      setMessages(data);
      setReceiver(otherUser);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  useEffect(() => {
    socket.on('receiveMessage', ({ from, message }) => {
      setMessages(prev => [...prev, { from, message }]);
    });
    return () => socket.off('receiveMessage');
  }, []);

  const sendMessage = () => {
    if (message && receiver?._id) {
      socket.emit('sendMessage', {
        from: user._id,
        to: receiver._id,
        message,
      });
      setMessages(prev => [...prev, { from: user._id, message }]);
      setMessage('');
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-page">
      <div className="chat-sidebar">
        <h4>💬 Chats</h4>
        {userList.map((peer) => (
          <div
            key={peer._id}
            className={`chat-user ${receiver?._id === peer._id ? 'active' : ''}`}
            onClick={() => fetchMessages(peer)}
          >
            <img
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${peer.name}`}
              alt="avatar"
              className="avatar"
            />
            <div className="user-info">
              <strong>{peer.name}</strong>
              <small>{peer.email}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-container">
        <div className="chat-header">
          <h3>{receiver ? `Chatting with ${receiver.name}` : 'Select a user to chat'}</h3>
        </div>

        <div className="chat-body">
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble ${msg.from === user._id ? 'sent' : 'received'}`}>
                {msg.message}
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        </div>

        {receiver && (
          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
