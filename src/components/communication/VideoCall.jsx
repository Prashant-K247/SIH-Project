import React, { useEffect, useState } from "react";
import commService from "../../services/commService";
import axios from "axios";
import "./VideoCall.css";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";


export default function VideoCall() {
  const location = useLocation();
  const { contact } = location.state || {};
  const [joined, setJoined] = useState(false);
  console.log(contact);
  const navigate = useNavigate();
  const userId = useSelector(state => state.auth.user._id);            // will change it fetch from redux

  const channelName = [userId, contact._id].sort().join("_");

  useEffect(() => {
    const initCall = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/comms/rtc/${channelName}`);
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

  const handleLeave = ()=>{
    commService.leaveRTC;
    navigate(`/chat/${contact._id}`)
  }

  return (
    <div className="video-call-container">
      <h2>Video Call Session</h2>
      <div className="videos">
        <div id="local-player" className="local-video"></div>
        <div id="remote-container" className="remote-videos"></div>
      </div>
      {joined && <button className="leave-btn" onClick={handleLeave}>Leave Call</button>}
    </div>
  );
}
