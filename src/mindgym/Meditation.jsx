import React, { useState, useEffect, useRef } from "react";

/**
 * Meditation.jsx
 * ------------------------------------------------------------
 * A full meditation page with:
 *  - Timer (5/10/15/30 mins)
 *  - Auto-start looping sounds (Ocean, Rain, Forest, Flute)
 *  - Rotating quotes/mantras
 *  - Progress circle visualization
 *  - Dark/Light mode toggle
 *  - Session summary at end
 *  - Keyboard shortcuts: Space = Pause/Resume, Esc = Stop
 * ------------------------------------------------------------
 */

export default function Meditation() {
  // ---------------------- STATES ----------------------
  const [isDark, setIsDark] = useState(true); // Dark/Light theme
  const [duration, setDuration] = useState(0); // Total minutes chosen
  const [timeLeft, setTimeLeft] = useState(0); // Seconds left
  const [isActive, setIsActive] = useState(false); // Session running
  const [isPaused, setIsPaused] = useState(false); // Pause state
  const [sound, setSound] = useState("ocean"); // Selected sound
  const [completed, setCompleted] = useState(false); // Session done
  const [currentQuote, setCurrentQuote] = useState(""); // Rotating quote

  // Ref to audio element
  const audioRef = useRef(null);

  // ---------------------- SOUND LIBRARY ----------------------
  const sounds = {
    ocean:
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_6a8e7e7a5b.mp3?filename=relaxing-sea-waves-ambient-110624.mp3",
    rain:
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_d6b27b6082.mp3?filename=gentle-rain-ambient-110624.mp3",
    forest:
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_799f88a7cb.mp3?filename=forest-nature-ambience-110623.mp3",
    flute:
      "https://cdn.pixabay.com/download/audio/2021/11/09/audio_91a63e2499.mp3?filename=indian-flute-ambient-110625.mp3",
  };

  // ---------------------- QUOTES ----------------------
  const quotes = [
    "“Quiet the mind, and the soul will speak.” – Ma Jaya Sati Bhagavati",
    "“Inhale the future, exhale the past.”",
    "“Meditation is the discovery that the point of life is always arrived at in the immediate moment.” – Alan Watts",
    "“Your calm mind is the ultimate weapon against your challenges.”",
    "“The soul always knows what to do to heal itself. The challenge is to silence the mind.”",
    "“Meditation is a vital way to purify and quiet the mind, thus rejuvenating the body.” – Deepak Chopra",
  ];

  // ---------------------- TIMER EFFECT ----------------------
  useEffect(() => {
    if (!isActive || isPaused) return;

    if (timeLeft <= 0 && duration > 0) {
      setIsActive(false);
      setCompleted(true);
      stopAudio();
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
    }, 15000); // new quote every 15 sec
    return () => clearInterval(interval);
  }, [isActive]);

  // ---------------------- AUDIO HANDLING ----------------------
  useEffect(() => {
    if (isActive && !isPaused && sound) {
      playAudio(sounds[sound]);
    }
  }, [sound, isActive, isPaused]);

  const playAudio = (url) => {
    if (!audioRef.current) return;
    audioRef.current.src = url;
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    audioRef.current
      .play()
      .catch((err) => console.log("Audio play error:", err));
  };

  const stopAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  // ---------------------- KEYBOARD SHORTCUTS ----------------------
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (isActive) {
          setIsPaused((p) => !p);
          if (!isPaused) {
            stopAudio();
          } else {
            playAudio(sounds[sound]);
          }
        }
      } else if (e.code === "Escape") {
        e.preventDefault();
        stopSession();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  // ---------------------- SESSION HANDLERS ----------------------
  const startSession = (mins) => {
    setDuration(mins);
    setTimeLeft(mins * 60);
    setIsActive(true);
    setIsPaused(false);
    setCompleted(false);
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
    playAudio(sounds[sound]);
  };

  const stopSession = () => {
    setIsActive(false);
    setIsPaused(false);
    setDuration(0);
    setTimeLeft(0);
    stopAudio();
  };

  // Format mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Progress circle %
  const progress = duration ? ((duration * 60 - timeLeft) / (duration * 60)) * 100 : 0;

  // ---------------------- RENDER ----------------------
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100"
          : "bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 text-gray-800"
      }`}
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} />

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-8 drop-shadow-lg">
        🧘 Meditation Space
      </h1>

      {/* Controls if not active */}
      {!isActive && !completed && (
        <div className="flex flex-col items-center space-y-6">
          {/* Duration Buttons */}
          <div className="flex space-x-4">
            {[5, 10, 15, 30].map((m) => (
              <button
                key={m}
                onClick={() => startSession(m)}
                className="px-4 py-2 rounded-xl font-semibold shadow-md
                bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                {m} min
              </button>
            ))}
          </div>

          {/* Sound Selector */}
          <div className="flex space-x-4">
            {Object.keys(sounds).map((key) => (
              <button
                key={key}
                onClick={() => setSound(key)}
                className={`px-3 py-2 rounded-lg font-medium transition ${
                  sound === key
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark((d) => !d)}
            className="mt-4 px-3 py-1 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
          >
            {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>
      )}

      {/* Active Session */}
      {isActive && (
        <div className="flex flex-col items-center space-y-8">
          {/* Progress Circle */}
          <div className="relative w-56 h-56">
            <svg className="w-full h-full">
              <circle
                className="text-gray-400"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="100"
                cx="112"
                cy="112"
              />
              <circle
                className="text-green-500 transition-all duration-1000"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 100}
                strokeDashoffset={
                  2 * Math.PI * 100 - (progress / 100) * (2 * Math.PI * 100)
                }
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="100"
                cx="112"
                cy="112"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold">
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Quote */}
          <p className="text-lg italic text-center max-w-md leading-relaxed">
            {currentQuote}
          </p>

          {/* Controls */}
          <div className="flex space-x-4">
            <button
              onClick={() => setIsPaused((p) => !p)}
              className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
            <button
              onClick={stopSession}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              Stop
            </button>
          </div>
        </div>
      )}

      {/* Session Summary */}
      {completed && (
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-2xl font-bold text-green-500">
            🎉 Well done!
          </h2>
          <p className="text-center">
            You completed a {duration}-minute meditation session.
          </p>
          <button
            onClick={() => setCompleted(false)}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Start Again
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="absolute bottom-4 text-sm opacity-70">
        Made with ❤️ for your calmness
      </footer>
    </div>
  );
}

