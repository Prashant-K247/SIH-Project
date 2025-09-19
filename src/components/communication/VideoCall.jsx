import React, { useEffect, useState } from "react";
import commService from "../../services/commService";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function VideoCall() {
  const location = useLocation();
  const { contact } = location.state || {};
  const [joined, setJoined] = useState(false);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user._id); // will change it fetch from redux

  const channelName = [userId, contact._id].sort().join("_");

  useEffect(() => {
    const initCall = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/comms/rtc/${channelName}`
        );
        await commService.joinRTC(data);
        setJoined(true);
      } catch (err) {
        console.error("Failed to join call:", err);
      }
    };
    initCall();

    return () => {
      commService.leaveRTC();
    };
  }, [channelName]);

  const handleLeave = () => {
    commService.leaveRTC();
    navigate(`/chat/${contact._id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 font-sans bg-gray-100 min-h-screen p-5">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Video Call Session
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl justify-center">
        {/* Local video */}
        <div
          id="local-player"
          className="w-full h-60 bg-black rounded-xl border-4 border-green-500 shadow-md overflow-hidden"
        ></div>

        {/* Remote videos */}
        <div
          id="remote-container"
          className="flex flex-wrap gap-4 justify-center mt-4 sm:mt-0"
        >
          {/* Remote videos will be appended here */}
          <div className="w-80 h-60 bg-black rounded-xl border-4 border-blue-500 shadow-md overflow-hidden hidden"></div>
        </div>
      </div>

      {joined && (
        <button
          onClick={handleLeave}
          className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg transition transform hover:scale-105 hover:from-red-700 hover:to-red-800"
        >
          Leave Call
        </button>
      )}
    </div>
  );
}
