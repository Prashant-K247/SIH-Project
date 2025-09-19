// ChatInterface.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Video } from "lucide-react";
import commService from "../services/commService";
import { useSelector } from "react-redux";
import axios from "axios";
import "./ChatInterface.css"; // Import the CSS file

export default function ChatInterface({ contact }) {
  const navigate = useNavigate();

  const myId = useSelector((state) => state.auth.user.id); // get from REDUX
  
  const [room, setRoom] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  //-----------------------------------------------------Rendering the Chat Page on go-----------------------------------------------------------

  useEffect(() => {
    const initRoom = async () => {
      try {
        //----------------------------------------connecting the 2 users in a room
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/comms/chatroom`,
          { userA: myId, userB: contact._id },
          {withCredentials: true}
        );

        const { roomId, appId, uid, token } = data;
        setRoom(roomId); // { roomId, participants }

        //---------------------------------------------------fetching old chats
        const history = await axios.post(
          `${import.meta.env.VITE_API_URL}/messages`,
          { userA: myId, userB: contact._id }
        );

        const sortedMessages = history.data.messages.map((msg) => ({
          id: msg._id, // use MongoDB’s unique ID
          senderId: msg.sender,
          text: msg.text,
          timestamp: new Date(msg.createdAt).getTime(),
        }));

        console.log(sortedMessages);
        

        setMessages(sortedMessages);

        //-----------------------------------------------------logging in and adding listeners

        
        await commService.loginRTM({appId, uid, token});
        await commService.joinRTMChannel(roomId);

        commService.onMessage((msg) => {
          setMessages((prev) => [...prev, msg]);
        });
      } catch (err) {
        console.error("Failed to init chat room:", err);
      }
    };

    if (myId && contact?._id) initRoom();

    return () => {
      commService.leaveRTM();
      setMessages([]);
    };
  }, [myId, contact]);

  // ---------------------------------------------------------Video Call handler--------------------------------------------------------------

  const handleVideoCall = () => {
    // TODO: Navigate to the video call page for this contact
    navigate("/video-call", { state: { contact } });
    console.log("Video call clicked for", contact.name);
  };

  // ------------------------------------------------------------Chat Handler-------------------------------------------------------------

  const handleSendMessage = () => {
    // TODO: Send message via RTM and/or persist to DB
    if (!input.trim()) return;
    commService.sendMessage(input);
    axios.post(`${import.meta.env.VITE_API_URL}/messages/save`, {
      sender: myId,
      receiver: contact._id,
      text: input,
    });

    setMessages((prev) => [...prev, { senderId: myId, text: input }]); // optional: show instantly
    setInput("");
  };

  //------------------------------------------------------------ChatBox Logic---------------------------------------------------------------

  const handleInputChange = (e) => setInput(e.target.value);

  //------------------------------------------------------------page structure------------------------------------------------------------------

  return (
    <div className="chat-interface-container">
      {/* Top bar */}
      <div className="chat-header">
        <h3>{contact.name}</h3>
        <Video className="video-icon" onClick={handleVideoCall} />
      </div>

      {/* Middle message area */}
      <div className="chat-messages">
        {messages.map((msg) => {
          console.log(msg);
          
          const isSent = msg.senderId === myId;
          return (
            <div
              key={msg.id || msg.timestamp}
              className={`message ${isSent ? "sent" : "received"}`}
            >
              {msg.text}
            </div>
          );
        })}
      </div>

      {/* Bottom input area */}
      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}
