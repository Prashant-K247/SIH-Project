import React, { useState, useEffect } from "react";

/**
 * Final Clean Meditation.jsx
 * ------------------------------------------------------------
 * Features:
 *  - Timer (5/10/15/30 mins)
 *  - Background YouTube videos (Ocean, Rain, Forest, Flute)
 *  - Rotating quotes/mantras
 *  - Progress circle visualization
 *  - Dark/Light mode toggle (default: Light)
 *  - Fullscreen toggle
 *  - Stop confirmation + Session summary
 *  - Keyboard shortcuts: Space = Pause/Resume, Esc = Stop
 * ------------------------------------------------------------
 */

export default function Meditation() {
  const [isDark, setIsDark] = useState(false); // Default light mode
  const [duration, setDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [video, setVideo] = useState("ocean");
  const [completed, setCompleted] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showStopConfirm, setShowStopConfirm] = useState(false);
  const [sessionDetails, setSessionDetails] = useState(null);

  // ---------------------- YOUTUBE LINKS ----------------------
  const videos = {
    ocean: "https://youtu.be/o8GrqUSdzi0?si=jz2un8_FFgS96kpd",
    rain: "https://youtu.be/o8GrqUSdzi0?si=b3mhh8eg3DzxDrpt",
    forest: "https://youtu.be/Nd7e4SNjGBM?si=aXd_rgAgFBroDjnu",
    flute: "https://youtu.be/GN5q747x1zI?si=-clH3L3H2N_kfZXc",
  };

  const getYouTubeID = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  // ---------------------- QUOTES ----------------------
  const quotes = [
    "“Quiet the mind, and the soul will speak.”",
    "“Inhale the future, exhale the past.”",
    "“Meditation is the discovery that the point of life is always in the moment.” – Alan Watts",
    "“Your calm mind is the ultimate weapon against your challenges.”",
    "“The soul always knows what to do to heal itself.”",
    "“Meditation is a way to purify and rejuvenate the body.” – Deepak Chopra",
  ];

  // ---------------------- TIMER ----------------------
  useEffect(() => {
    if (!isActive || isPaused) return;

    if (timeLeft <= 0 && duration > 0) {
      finishSession();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isPaused, timeLeft]);

  // ---------------------- QUOTES ROTATION ----------------------
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }, 15000);
    return () => clearInterval(interval);
  }, [isActive]);

  // ---------------------- KEYBOARD SHORTCUTS ----------------------
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (isActive) setIsPaused((p) => !p);
      } else if (e.code === "Escape") {
        e.preventDefault();
        setShowStopConfirm(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  // ---------------------- FULLSCREEN ----------------------
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // ---------------------- SESSION ----------------------
  const startSession = (mins) => {
    setDuration(mins);
    setTimeLeft(mins * 60);
    setIsActive(true);
    setIsPaused(false);
    setCompleted(false);
    setSessionDetails(null);
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  const stopSession = () => {
    setIsActive(false);
    setIsPaused(false);
    setShowStopConfirm(false);
    setSessionDetails({
      planned: duration,
      completed: ((duration * 60 - timeLeft) / 60).toFixed(1),
    });
    setCompleted(true);
    setDuration(0);
    setTimeLeft(0);
  };

  const finishSession = () => {
    setIsActive(false);
    setCompleted(true);
    setSessionDetails({ planned: duration, completed: duration });
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const progress = duration
    ? ((duration * 60 - timeLeft) / (duration * 60)) * 100
    : 0;

  // ---------------------- RENDER ----------------------
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start p-6 transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100"
          : "bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 text-gray-900"
      }`}
    >
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">🧘 Meditation Space</h1>

      {/* Dark/Light and Fullscreen buttons */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setIsDark((d) => !d)}
          className="px-2 py-1 text-sm rounded-lg bg-gray-700 text-white hover:bg-gray-600"
        >
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
        <button
          onClick={toggleFullscreen}
          className="px-2 py-1 text-sm rounded-lg bg-gray-700 text-white hover:bg-gray-600"
        >
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
      </div>

      {/* YouTube Video */}
      <div className="w-full max-w-2xl aspect-video rounded-lg shadow-lg overflow-hidden mb-6">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${getYouTubeID(
            videos[video]
          )}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeID(
            videos[video]
          )}&controls=1&modestbranding=1&rel=0`}
          title="Meditation Video"
          frameBorder="0"
          allow="autoplay; fullscreen"
        ></iframe>
      </div>

      {/* Controls if not active */}
      {!isActive && !completed && (
        <div className="flex flex-col items-center space-y-6">
          {/* Duration Buttons */}
          <div className="flex space-x-4">
            {[5, 10, 15, 30].map((m) => (
              <button
                key={m}
                onClick={() => startSession(m)}
                className="px-4 py-2 rounded-xl font-semibold shadow-md bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {m} min
              </button>
            ))}
          </div>

          {/* Video Selector */}
          <div className="flex space-x-4">
            {Object.keys(videos).map((key) => (
              <button
                key={key}
                onClick={() => setVideo(key)}
                className={`px-3 py-2 rounded-lg font-medium transition ${
                  video === key
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Session */}
      {isActive && (
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full">
              <circle
                className="text-gray-400"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="90"
                cx="96"
                cy="96"
              />
              <circle
                className="text-green-500 transition-all duration-1000"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 90}
                strokeDashoffset={
                  2 * Math.PI * 90 - (progress / 100) * (2 * Math.PI * 90)
                }
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="90"
                cx="96"
                cy="96"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
              {formatTime(timeLeft)}
            </div>
          </div>

          <p className="text-center italic max-w-md leading-relaxed">
            {currentQuote}
          </p>

          <div className="flex space-x-4">
            <button
              onClick={() => setIsPaused((p) => !p)}
              className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
            <button
              onClick={() => setShowStopConfirm(true)}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              Stop
            </button>
          </div>
        </div>
      )}

      {/* Stop Confirmation */}
      {showStopConfirm && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center space-y-4">
            <p className="text-lg font-semibold text-center text-gray-900 dark:text-gray-100">
              Are you sure you want to stop the session?
            </p>
            <div className="flex space-x-4">
              <button
                onClick={stopSession}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Yes, Stop
              </button>
              <button
                onClick={() => setShowStopConfirm(false)}
                className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Session Summary */}
      {completed && sessionDetails && (
        <div className="flex flex-col items-center space-y-4 mt-6">
          <h2 className="text-2xl font-bold text-green-500">🎉 Session Complete</h2>
          <p className="text-center">
            Planned: {sessionDetails.planned} min <br />
            Completed: {sessionDetails.completed} min
          </p>
          <button
            onClick={() => setCompleted(false)}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Start Again
          </button>
        </div>
      )}

    <footer className="w-full text-center py-4 text-sm opacity-70">
  Made with ❤️ for your calmness
</footer>

    </div>
  );
}
