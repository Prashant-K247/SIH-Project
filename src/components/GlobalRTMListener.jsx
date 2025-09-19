// components/GlobalRTMListener.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import commService from "../services/commService";
import axios from "axios";

export default function GlobalRTMListener() {
  const userId = useSelector((state) => state.auth.user?._id);
  if(!userId){
    return;
  }
  const [incomingCall, setIncomingCall] = useState(null);

  useEffect(() => {
    const initRTM = async () => {
      if (!userId) return;

      // 1️⃣ Initialize RTM
      await commService.initRTM(process.env.VITE_APP_ID, userId);
      await commService.loginRTM({ appId: process.env.VITE_APP_ID, uid: userId, token: null });

      // 2️⃣ Listen for call invites
      commService.onCallInvite(({ channelName, from }) => {
        setIncomingCall({ channelName, from });
      });
    };

    initRTM();
  }, [userId]);

  // Accept handler
  const acceptCall = async () => {
    if (!incomingCall) return;

    try {
      // Fetch RTC join data
      const { data } = await axios.get(
        `${process.env.VITE_API_URL}/comms/rtc/${incomingCall.channelName}`
      );

      // Join RTC and mount video
      await commService.joinRTC(data);

      // Notify caller
      await commService.sendCallResponse(incomingCall.from, true);

      // Hide incoming call modal
      setIncomingCall(null);
    } catch (err) {
      console.error("Failed to accept call:", err);
    }
  };

  // Decline handler
  const declineCall = async () => {
    if (!incomingCall) return;
    await commService.sendCallResponse(incomingCall.from, false);
    setIncomingCall(null);
  };

  // Hang up handler (after joining RTC)
  const hangUp = async () => {
    await commService.leaveRTC();
  };

  // Only render if there’s an incoming call or an active call
  if (!incomingCall) return null;

  return (
    <div className="incoming-call-modal" style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "300px",
      backgroundColor: "#1f1f1f",
      color: "white",
      padding: "10px",
      borderRadius: "10px",
      zIndex: 1000,
    }}>
      <p>Incoming call from {incomingCall.from}</p>
      <button onClick={acceptCall} style={{ marginRight: "5px" }}>Accept</button>
      <button onClick={declineCall} style={{ marginRight: "5px" }}>Decline</button>
      <button onClick={hangUp}>Hang Up</button>

      {/* Video containers */}
      <div id="local-player" className="local-video" style={{ width: "100%", marginTop: "10px" }}></div>
      <div id="remote-container" className="remote-videos" style={{ width: "100%", marginTop: "10px" }}></div>
    </div>
  );
}
