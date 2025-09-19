// ChatInterface.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Video } from "lucide-react";
import commService from "../services/commService";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ChatInterface({ contact }) {
  const navigate = useNavigate();
  const myId = useSelector((state) => state.auth.user.id); // from Redux

  const [room, setRoom] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const initRoom = async () => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/comms/chatroom`,
          { userA: myId, userB: contact._id },
          { withCredentials: true }
        );

        const { roomId, appId, uid, token } = data;
        setRoom(roomId);

        const history = await axios.post(
          `${import.meta.env.VITE_API_URL}/messages`,
          { userA: myId, userB: contact._id }
        );

        const sortedMessages = history.data.messages.map((msg) => ({
          id: msg._id,
          senderId: msg.sender,
          text: msg.text,
          timestamp: new Date(msg.createdAt).getTime(),
        }));

        setMessages(sortedMessages);

        await commService.loginRTM({ appId, uid, token });
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

  const handleVideoCall = () => {
    navigate("/video-call", { state: { contact } });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    commService.sendMessage(input);
    axios.post(`${import.meta.env.VITE_API_URL}/messages/save`, {
      sender: myId,
      receiver: contact._id,
      text: input,
    });

    setMessages((prev) => [...prev, { senderId: myId, text: input }]);
    setInput("");
  };

  const handleInputChange = (e) => setInput(e.target.value);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-inter">
      {/* Top bar */}
      <div className="flex justify-between items-center px-5 py-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
          {contact.name}
        </h3>
        <Video
          className="w-7 h-7 text-gray-600 cursor-pointer transition-transform duration-200 hover:text-blue-600 hover:scale-110"
          onClick={handleVideoCall}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {messages.map((msg) => {
          const isSent = msg.senderId === myId;
          return (
            <div
              key={msg.id || msg.timestamp}
              className={`max-w-[75%] px-3 py-2 rounded-xl text-sm leading-relaxed animate-fadeIn ${
                isSent
                  ? "self-end bg-blue-500 text-white rounded-br-md"
                  : "self-start bg-gray-200 text-gray-900 rounded-bl-md"
              }`}
            >
              {msg.text}
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white border-t border-gray-200">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-grow px-4 py-2.5 rounded-full border border-gray-300 outline-none text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        />
        <button
          onClick={handleSendMessage}
          className="px-5 py-2.5 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transform hover:scale-105 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
