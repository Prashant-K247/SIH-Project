import React, { useState, useEffect } from "react";

export default function Breathing() {
  const [phase, setPhase] = useState("Inhale");
  const [counter, setCounter] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev === 1) {
          if (phase === "Inhale") {
            setPhase("Hold");
            return 7;
          } else if (phase === "Hold") {
            setPhase("Exhale");
            return 8;
          } else {
            setPhase("Inhale");
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen 
  bg-gradient-to-tr from-gray-900 via-purple-900 to-indigo-900 text-white p-6">


      {/* Title */}
      <h1 className="text-5xl font-extrabold tracking-wide mb-10 drop-shadow-lg">
        🌿 Breathing Exercise
      </h1>

      {/* Animated Circle */}
      <div
        className={`w-56 h-56 rounded-full bg-white/20 backdrop-blur-md 
        flex items-center justify-center text-3xl font-bold shadow-2xl
        transition-all duration-1000 ease-in-out 
        ${phase === "Inhale" ? "scale-125" : phase === "Exhale" ? "scale-75" : "scale-100"}`}
      >
        {phase}
      </div>

      {/* Timer */}
      <div className="mt-8 text-7xl font-extrabold tracking-wider drop-shadow-md">
        {counter}
      </div>

      {/* Subtitle */}
      <p className="mt-6 text-xl italic text-white/90 text-center max-w-md leading-relaxed">
        Sync your breath with the circle.  
        Inhale calmness, hold stillness, exhale stress.
      </p>

      {/* Footer */}
      <footer className="absolute bottom-6 text-sm text-white/70">
        Made with ❤️ for your calmness
      </footer>
    </div>
  );
}
