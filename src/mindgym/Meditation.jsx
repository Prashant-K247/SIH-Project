import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Modern Meditation App with Enhanced Breathing Exercises
// Features:
// - Modern glassmorphism UI design
// - Advanced breathing exercises with visual guides
// - Multiple breathing patterns (4-7-8, Box, Triangle, etc.)
// - Smooth animations and transitions
// - Progress tracking and mood insights
// - Ambient sounds and TTS support
// - Responsive design with dark/light themes

export default function MeditationApp() {
  // --- Enhanced default sessions with breathing exercises ---
  const DEFAULT_SESSIONS = [
    {
      id: "stress-5",
      title: "5-min Stress Relief",
      duration: 5 * 60,
      text: "Find a comfortable seat. Breathe slowly. Let thoughts come and go. If attention wanders, gently return.",
      audio: "stress-relief",
      type: "guided",
    },
    {
      id: "focus-10",
      title: "10-min Focus",
      duration: 10 * 60,
      text: "Bring attention to the breath. Use this session to prime for focused work. Notice distractions and return to breath.",
      audio: "focus",
      type: "guided",
    },
    {
      id: "box-breathing",
      title: "Box Breathing",
      duration: 2 * 60,
      text: "Box Breathing: inhale 4s - hold 4s - exhale 4s - hold 4s. Repeat.",
      audio: "breathing",
      type: "breathing",
      breathingPattern: { inhale: 4, hold1: 4, exhale: 4, hold2: 4 },
    },
    {
      id: "478-breathing",
      title: "4-7-8 Breathing",
      duration: 3 * 60,
      text: "4-7-8 Breathing: inhale 4s - hold 7s - exhale 8s. Repeat.",
      audio: "breathing",
      type: "breathing",
      breathingPattern: { inhale: 4, hold1: 7, exhale: 8, hold2: 0 },
    },
    {
      id: "triangle-breathing",
      title: "Triangle Breathing",
      duration: 3 * 60,
      text: "Triangle Breathing: inhale 4s - hold 4s - exhale 4s. Repeat.",
      audio: "breathing",
      type: "breathing",
      breathingPattern: { inhale: 4, hold1: 4, exhale: 4, hold2: 0 },
    },
    {
      id: "deep-breathing",
      title: "Deep Breathing",
      duration: 5 * 60,
      text: "Deep Breathing: slow inhale 6s - hold 2s - slow exhale 6s. Repeat.",
      audio: "breathing",
      type: "breathing",
      breathingPattern: { inhale: 6, hold1: 2, exhale: 6, hold2: 0 },
    },
  ];

  // --- Local state and refs ---
  const [sessions, setSessions] = useState(() => {
    try {
      const s = JSON.parse(localStorage.getItem("med_sessions_v2"));
      return s && s.length ? s : DEFAULT_SESSIONS;
    } catch (e) {
      return DEFAULT_SESSIONS;
    }
  });

  const [selectedId, setSelectedId] = useState(sessions[0].id);
  const selected = sessions.find((s) => s.id === selectedId) || sessions[0];

  const [secondsLeft, setSecondsLeft] = useState(selected.duration);
  const [running, setRunning] = useState(false);
  const [ambient, setAmbient] = useState("none");
  const [lowBandwidth, setLowBandwidth] = useState(false);
  const [moodBefore, setMoodBefore] = useState(null);
  const [moodAfter, setMoodAfter] = useState(null);
  
  // Breathing exercise states
  const [breathingPhase, setBreathingPhase] = useState("inhale"); // inhale, hold1, exhale, hold2
  const [breathingCountdown, setBreathingCountdown] = useState(0);
  const [breathingCycle, setBreathingCycle] = useState(0);
  const [breathingSpeed, setBreathingSpeed] = useState(1); // Speed multiplier for breathing exercises
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("med_history_v2")) || [];
    } catch (e) {
      return [];
    }
  });

  const [meta, setMeta] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("med_meta_v2")) || { streak: 0, lastDay: null, badges: [] };
    } catch (e) {
      return { streak: 0, lastDay: null, badges: [] };
    }
  });

  const [theme, setTheme] = useState("dark");

  const audioRef = useRef(null);
  const ambientRef = useRef(null);
  const timerRef = useRef(null);

  // progress for ring (0..1)
  const progress = 1 - secondsLeft / selected.duration;

  // --- Effects ---
  // update seconds whenever selected changes
  useEffect(() => {
    setSecondsLeft(selected.duration);
    // stop any playing audio when switching
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    
    // Initialize breathing exercise
    if (selected.type === "breathing" && selected.breathingPattern) {
      setBreathingPhase("inhale");
      setBreathingCountdown(selected.breathingPattern.inhale);
      setBreathingCycle(0);
    }
  }, [selectedId]);

  // persist sessions
  useEffect(() => {
    try {
      localStorage.setItem("med_sessions_v2", JSON.stringify(sessions));
    } catch (e) {}
  }, [sessions]);

  // set dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // ambient sound handling
  useEffect(() => {
    if (ambientRef.current) {
      ambientRef.current.pause();
      ambientRef.current.currentTime = 0;
    }
    if (ambient !== "none") {
      const url = getAmbientUrl(ambient);
      ambientRef.current = new Audio(url);
      ambientRef.current.loop = true;
      // only auto-play if running and not low bandwidth
      if (running && !lowBandwidth) ambientRef.current.play().catch(() => {});
    }
    return () => {
      if (ambientRef.current) ambientRef.current.pause();
    };
  }, [ambient]);

  // timer effect with breathing exercise support
  useEffect(() => {
    if (!running) return undefined;

    timerRef.current = setInterval(() => {
      setSecondsLeft((sec) => {
        if (sec <= 1) {
          clearInterval(timerRef.current);
          finishSession();
          return 0;
        }
        return sec - 1;
      });

      // Handle breathing exercises
      if (selected.type === "breathing" && selected.breathingPattern) {
        setBreathingCountdown((count) => {
          if (count <= 1) {
            // Move to next phase
            const pattern = selected.breathingPattern;
            const phases = ["inhale", "hold1", "exhale", "hold2"];
            const durations = [pattern.inhale, pattern.hold1, pattern.exhale, pattern.hold2];
            
            const currentIndex = phases.indexOf(breathingPhase);
            let nextIndex = currentIndex + 1;
            
            if (nextIndex >= phases.length || durations[nextIndex] === 0) {
              nextIndex = 0; // Start new cycle
              setBreathingCycle(cycle => cycle + 1);
            }
            
            setBreathingPhase(phases[nextIndex]);
            return durations[nextIndex];
          }
          return count - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, breathingPhase]);

  // make sure ambient plays/pauses with running
  useEffect(() => {
    if (ambientRef.current) {
      if (running && !lowBandwidth) ambientRef.current.play().catch(() => {});
      else ambientRef.current.pause();
    }
  }, [running, lowBandwidth]);

  // --- Helpers ---
  function getAmbientUrl(name) {
    const map = {
      rain: "/audio/ambient/rain.mp3",
      ocean: "/audio/ambient/ocean.mp3",
      forest: "/audio/ambient/forest.mp3",
    };
    return map[name];
  }

  function getMeditationAudioUrl(type) {
    const audioMap = {
      "stress-relief": "/audio/meditation/stress-relief.mp3",
      "focus": "/audio/meditation/focus.mp3",
      "breathing": "/audio/meditation/breathing.mp3",
      "default": "/audio/meditation/bells.mp3"
    };
    return audioMap[type] || audioMap.default;
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  }

  // Notifications
  async function ensureNotificationPermission() {
    if (!("Notification" in window)) return false;
    if (Notification.permission === "granted") return true;
    if (Notification.permission !== "denied") {
      const res = await Notification.requestPermission();
      return res === "granted";
    }
    return false;
  }

  // TTS
  function speakText(text) {
    if (lowBandwidth) return;
    if ("speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 1;
      utter.pitch = 1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }
  }

  // Start session
  function startSession() {
    if (!moodBefore) {
      // encourage mood tagging but allow
      console.info("Consider setting mood before starting to track changes.");
    }

    // play meditation audio if provided and allowed
    if (!lowBandwidth && selected.audio) {
      const audioUrl = typeof selected.audio === 'string' && selected.audio.startsWith('http') 
        ? selected.audio 
        : getMeditationAudioUrl(selected.audio);
      
      audioRef.current = new Audio(audioUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3; // Lower volume for background meditation audio
      audioRef.current.play().catch(() => {
        console.log("Audio playback failed, continuing without audio");
      });
    } else if (!lowBandwidth && selected.type === "guided" && selected.text) {
      // TTS fallback (short guidance) — speak first line
      speakText(selected.text);
    }

    // ambient will autostart via effect when running toggles
    setRunning(true);
  }

  function pauseSession() {
    setRunning(false);
    clearInterval(timerRef.current);
    if (audioRef.current) audioRef.current.pause();
    if (ambientRef.current) ambientRef.current.pause();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  function finishSession() {
    setRunning(false);
    clearInterval(timerRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (ambientRef.current) {
      ambientRef.current.pause();
      ambientRef.current.currentTime = 0;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();

    const record = {
      id: selected.id,
      title: selected.title,
      date: new Date().toISOString(),
      moodBefore,
      moodAfter,
      duration: selected.duration,
    };

    const newHist = [record, ...history].slice(0, 500);
    setHistory(newHist);
    localStorage.setItem("med_history_v2", JSON.stringify(newHist));

    // update streak logic
    try {
      const lastDay = meta.lastDay ? new Date(meta.lastDay) : null;
      const today = new Date();
      let newStreak = meta.streak || 0;
      if (!lastDay) newStreak = 1;
      else {
        const ld = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate());
        const td = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const diff = Math.round((td - ld) / (1000 * 60 * 60 * 24));
        if (diff === 0) {
          // same day
        } else if (diff === 1) newStreak = (meta.streak || 0) + 1;
        else newStreak = 1;
      }

      const badges = [...(meta.badges || [])];
      if (newStreak >= 7 && !badges.includes("7-day")) badges.push("7-day");
      if (newStreak >= 30 && !badges.includes("30-day")) badges.push("30-day");

      const newMeta = { ...meta, streak: newStreak, lastDay: new Date().toISOString(), badges };
      setMeta(newMeta);
      localStorage.setItem("med_meta_v2", JSON.stringify(newMeta));
    } catch (e) {
      console.error(e);
    }

    // prompt a notification
    ensureNotificationPermission().then((ok) => {
      if (ok) new Notification("Session complete", { body: `${selected.title} finished` });
    });

    // reset timer state for UI (but keep selected)
    setSecondsLeft(selected.duration);

    // encourage mood after
    // speak a short praise
    speakText("Well done. Take a moment to notice how you feel now.");
  }

  function quickSkip(sec = 30) {
    setSecondsLeft((s) => Math.max(0, s - sec));
  }

  // create custom session
  function createCustomSession({ title, minutes, text, type = "guided", audio = "default" }) {
    const id = `custom-${Date.now()}`;
    const sessionData = { 
      id, 
      title, 
      duration: Math.max(10, Math.round(minutes * 60)), 
      text, 
      audio, 
      type 
    };
    
    if (type === "breathing") {
      sessionData.breathingPattern = { inhale: 4, hold1: 4, exhale: 4, hold2: 4 };
    }
    
    const next = [sessionData, ...sessions].slice(0, 50);
    setSessions(next);
    setSelectedId(id);
  }

  // delete custom session (only for user-created sessions)
  function deleteCustomSession(sessionId) {
    if (sessionId.startsWith('custom-')) {
      const updatedSessions = sessions.filter(s => s.id !== sessionId);
      setSessions(updatedSessions);
      
      // If we deleted the currently selected session, select the first available session
      if (selectedId === sessionId) {
        setSelectedId(updatedSessions[0]?.id || sessions[0]?.id);
      }
    }
  }

  // Audio file management helper
  function getAvailableAudioFiles() {
    return {
      meditation: [
        { id: 'default', name: 'Default Meditation Bells', file: 'bells.mp3' },
        { id: 'stress-relief', name: 'Stress Relief', file: 'stress-relief.mp3' },
        { id: 'focus', name: 'Focus & Concentration', file: 'focus.mp3' },
        { id: 'breathing', name: 'Breathing Exercise', file: 'breathing.mp3' }
      ],
      ambient: [
        { id: 'rain', name: 'Rain', file: 'rain.mp3' },
        { id: 'ocean', name: 'Ocean Waves', file: 'ocean.mp3' },
        { id: 'forest', name: 'Forest Sounds', file: 'forest.mp3' }
      ]
    };
  }


  // UI small helpers
  function readableSessionList() {
    return sessions.map((s) => `${s.title} — ${Math.round(s.duration / 60)} min`).join("\n");
  }

  // export history
  function exportHistory() {
    const exportData = { history, meta, sessions };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `med-history-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // delete history
  function clearHistory() {
    localStorage.removeItem("med_history_v2");
    setHistory([]);
  }

  // sample mood insights data for chart
  const moodData = history
    .slice()
    .reverse()
    .slice(0, 30)
    .map((h, i) => ({ name: new Date(h.date).toLocaleDateString(), mood: h.moodAfter ?? h.moodBefore ?? 0 }));

  // Enhanced breathing ring component with breathing exercise support
  function BreathingRing({ size = 280 }) {
    const radius = 110;
    const cx = size / 2;
    const cy = size / 2;
    const circumference = 2 * Math.PI * radius;
    const dash = circumference * Math.max(0, Math.min(1, progress));

    // Get breathing animation properties
    const getBreathingAnimation = () => {
      if (selected.type === "breathing" && selected.breathingPattern && running) {
        const pattern = selected.breathingPattern;
        const speedMultiplier = selected.id === "box-breathing" ? breathingSpeed : 1;
        
        let scale = 1;
        let opacity = 0.6;
        
        switch (breathingPhase) {
          case "inhale":
            scale = 1 + (breathingCountdown / pattern.inhale) * 0.3;
            opacity = 0.6 + (breathingCountdown / pattern.inhale) * 0.4;
            break;
          case "hold1":
            scale = 1.3;
            opacity = 1;
            break;
          case "exhale":
            scale = 1.3 - (breathingCountdown / pattern.exhale) * 0.3;
            opacity = 1 - (breathingCountdown / pattern.exhale) * 0.4;
            break;
          case "hold2":
            scale = 1;
            opacity = 0.6;
            break;
        }
        
        return { scale, opacity };
      }
      
      return running ? { scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] } : { scale: 1, opacity: 0.6 };
    };

    const breathingAnim = getBreathingAnimation();

    return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Outer glow ring */}
        <motion.div
          className="absolute rounded-full"
          style={{ width: size, height: size }}
          animate={running && selected.type === "breathing" ? {
            boxShadow: [
              "0 0 20px rgba(99, 102, 241, 0.3)",
              "0 0 40px rgba(99, 102, 241, 0.6)",
              "0 0 20px rgba(99, 102, 241, 0.3)"
            ]
          } : {}}
          transition={{ 
            duration: selected.id === "box-breathing" ? 8 / breathingSpeed : 8, 
            repeat: Infinity 
          }}
        />
        
        <svg width={size} height={size} className="absolute">
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            stroke="var(--ring-bg)"
            strokeWidth={8}
            fill="transparent"
            style={{ opacity: 0.3 }}
          />
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            stroke="var(--ring-fg)"
            strokeWidth={8}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference - dash}
            strokeLinecap="round"
            fill="transparent"
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        </svg>

        <motion.div
          className="rounded-full shadow-2xl flex items-center justify-center backdrop-blur-sm"
          style={{ 
            width: 200, 
            height: 200, 
            background: "var(--circle-bg)",
            border: "2px solid rgba(255, 255, 255, 0.1)"
          }}
          animate={breathingAnim}
          transition={{ 
            duration: selected.id === "box-breathing" ? 4 / breathingSpeed : 4, 
            ease: "easeInOut" 
          }}
        >
          <div className="text-center px-4">
            {selected.type === "breathing" && running ? (
              <>
                <motion.div 
                  className="text-xl font-bold mb-2"
                  animate={{ 
                    color: breathingPhase === "inhale" ? "#10b981" : 
                           breathingPhase === "hold1" ? "#f59e0b" :
                           breathingPhase === "exhale" ? "#ef4444" : "#6b7280"
                  }}
                >
                  {breathingPhase === "inhale" ? "Breathe In" :
                   breathingPhase === "hold1" ? "Hold" :
                   breathingPhase === "exhale" ? "Breathe Out" : "Pause"}
                </motion.div>
                <div className="font-mono text-3xl font-bold mb-1">{breathingCountdown}</div>
                <div className="text-sm opacity-70">Cycle {breathingCycle + 1}</div>
              </>
            ) : (
              <>
                <div className="text-lg font-semibold mb-2">{running ? "Meditating" : "Ready"}</div>
                <div className="font-mono text-2xl mb-1">{formatTime(secondsLeft)}</div>
                <div className="text-xs opacity-70">{selected.type}</div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // Enhanced form component with breathing pattern support
  function AddSessionForm({ onCreate }) {
    const [title, setTitle] = useState("");
    const [minutes, setMinutes] = useState(5);
    const [text, setText] = useState("");
    const [type, setType] = useState("guided");
    const [audio, setAudio] = useState("default");
    const [breathingPattern, setBreathingPattern] = useState({ inhale: 4, hold1: 4, exhale: 4, hold2: 4 });

    function submit(e) {
      e.preventDefault();
      if (!title) return;
      
      const sessionData = { 
        title, 
        minutes: Math.max(1, minutes), 
        text, 
        type,
        audio
      };
      
      if (type === "breathing") {
        sessionData.breathingPattern = breathingPattern;
      }
      
      onCreate(sessionData);
      setTitle("");
      setMinutes(5);
      setText("");
      setAudio("default");
      setBreathingPattern({ inhale: 4, hold1: 4, exhale: 4, hold2: 4 });
    }

    return (
      <form 
        onSubmit={submit} 
        className="space-y-3 p-4 backdrop-blur-sm rounded-xl border theme-transition"
        style={{ 
          background: 'var(--glass-bg)', 
          borderColor: 'var(--glass-border)' 
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Session title"
          className="w-full p-3 rounded-lg backdrop-blur-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 theme-transition"
          style={{ 
            background: 'var(--glass-bg)', 
            borderColor: 'var(--glass-border)', 
            color: 'var(--text-primary)' 
          }}
        />
        
        <div className="flex gap-3">
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="p-3 rounded-lg backdrop-blur-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 theme-transition w-24"
            style={{ 
              background: 'var(--glass-bg)', 
              borderColor: 'var(--glass-border)', 
              color: 'var(--text-primary)' 
            }}
            min={1}
            placeholder="Min"
          />
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            className="p-3 rounded-lg backdrop-blur-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 theme-transition"
            style={{ 
              background: 'var(--glass-bg)', 
              borderColor: 'var(--glass-border)', 
              color: 'var(--text-primary)' 
            }}
          >
            <option value="guided">Guided</option>
            <option value="breathing">Breathing</option>
          </select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block theme-transition" style={{ color: 'var(--text-primary)' }}>🎵 Meditation Audio</label>
          <select 
            value={audio} 
            onChange={(e) => setAudio(e.target.value)} 
            className="w-full p-3 rounded-lg backdrop-blur-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 theme-transition"
            style={{ 
              background: 'var(--glass-bg)', 
              borderColor: 'var(--glass-border)', 
              color: 'var(--text-primary)' 
            }}
          >
            <option value="default">🔔 Default Meditation Bells</option>
            <option value="stress-relief">🧘 Stress Relief</option>
            <option value="focus">🎯 Focus & Concentration</option>
            <option value="breathing">💨 Breathing Exercise</option>
          </select>
        </div>
        
        {type === "breathing" && (
          <div className="space-y-2 p-3 rounded-lg theme-transition" style={{ background: 'var(--glass-bg)' }}>
            <div className="text-sm font-medium mb-2 theme-transition" style={{ color: 'var(--text-primary)' }}>Breathing Pattern (seconds)</div>
            <div className="grid grid-cols-4 gap-2">
              <div>
                <label className="text-xs mb-1 block theme-transition" style={{ color: 'var(--text-secondary)' }}>Inhale</label>
                <input
                  type="number"
                  value={breathingPattern.inhale}
                  onChange={(e) => setBreathingPattern(prev => ({ ...prev, inhale: Number(e.target.value) }))}
                  className="w-full p-2 rounded border text-center theme-transition"
                  style={{ 
                    background: 'var(--glass-bg)', 
                    borderColor: 'var(--glass-border)', 
                    color: 'var(--text-primary)' 
                  }}
                  min={1}
                  max={20}
                />
              </div>
              <div>
                <label className="text-xs mb-1 block theme-transition" style={{ color: 'var(--text-secondary)' }}>Hold 1</label>
                <input
                  type="number"
                  value={breathingPattern.hold1}
                  onChange={(e) => setBreathingPattern(prev => ({ ...prev, hold1: Number(e.target.value) }))}
                  className="w-full p-2 rounded border text-center theme-transition"
                  style={{ 
                    background: 'var(--glass-bg)', 
                    borderColor: 'var(--glass-border)', 
                    color: 'var(--text-primary)' 
                  }}
                  min={0}
                  max={20}
                />
              </div>
              <div>
                <label className="text-xs mb-1 block theme-transition" style={{ color: 'var(--text-secondary)' }}>Exhale</label>
                <input
                  type="number"
                  value={breathingPattern.exhale}
                  onChange={(e) => setBreathingPattern(prev => ({ ...prev, exhale: Number(e.target.value) }))}
                  className="w-full p-2 rounded border text-center theme-transition"
                  style={{ 
                    background: 'var(--glass-bg)', 
                    borderColor: 'var(--glass-border)', 
                    color: 'var(--text-primary)' 
                  }}
                  min={1}
                  max={20}
                />
              </div>
              <div>
                <label className="text-xs mb-1 block theme-transition" style={{ color: 'var(--text-secondary)' }}>Hold 2</label>
                <input
                  type="number"
                  value={breathingPattern.hold2}
                  onChange={(e) => setBreathingPattern(prev => ({ ...prev, hold2: Number(e.target.value) }))}
                  className="w-full p-2 rounded border text-center theme-transition"
                  style={{ 
                    background: 'var(--glass-bg)', 
                    borderColor: 'var(--glass-border)', 
                    color: 'var(--text-primary)' 
                  }}
                  min={0}
                  max={20}
                />
              </div>
            </div>
          </div>
        )}
        
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Guidance / transcript (optional)"
          className="w-full p-3 rounded-lg backdrop-blur-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 theme-transition"
          style={{ 
            background: 'var(--glass-bg)', 
            borderColor: 'var(--glass-border)', 
            color: 'var(--text-primary)' 
          }}
          rows={3}
        />
        
        <motion.button 
          type="submit" 
          className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
            Add Session
        </motion.button>
      </form>
    );
  }

  // --- Enhanced CSS variables with proper light/dark mode ---
  const cssVars = (
    <style>{`
      :root {
        --ring-bg: rgba(255, 255, 255, 0.2);
        --ring-fg: #6366f1;
        --circle-bg: rgba(99, 102, 241, 0.15);
        --glass-bg: rgba(255, 255, 255, 0.15);
        --glass-border: rgba(255, 255, 255, 0.3);
        --text-primary: #1f2937;
        --text-secondary: #6b7280;
        --bg-primary: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        --bg-secondary: rgba(255, 255, 255, 0.8);
      }
      
      .dark {
        --ring-bg: rgba(0, 0, 0, 0.4);
        --ring-fg: #8b5cf6;
        --circle-bg: rgba(139, 92, 246, 0.15);
        --glass-bg: rgba(0, 0, 0, 0.3);
        --glass-border: rgba(255, 255, 255, 0.1);
        --text-primary: #f9fafb;
        --text-secondary: #d1d5db;
        --bg-primary: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        --bg-secondary: rgba(0, 0, 0, 0.4);
      }
      
      body {
        background: var(--bg-primary);
        min-height: 100vh;
        transition: background 0.3s ease;
      }
      
      .theme-transition {
        transition: all 0.3s ease;
      }
    `}</style>
  );

  // --- Modern Render ---
  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto">
      {cssVars}
      
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-4xl font-bold mb-2 theme-transition" style={{ color: 'var(--text-primary)' }}>🧘 MindGym</h1>
          <p className="text-lg theme-transition" style={{ color: 'var(--text-secondary)' }}>Modern meditation & breathing exercises for mindfulness</p>
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            onClick={() => {
              ensureNotificationPermission();
            }}
            className="px-4 py-3 rounded-xl backdrop-blur-sm border transition-all duration-200 theme-transition"
            style={{ 
              background: 'var(--glass-bg)', 
              borderColor: 'var(--glass-border)', 
              color: 'var(--text-primary)' 
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔔 Notifications
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Modern Sidebar */}
        <motion.aside 
          className="col-span-1 backdrop-blur-lg border rounded-2xl p-6 shadow-xl theme-transition"
          style={{ 
            background: 'var(--glass-bg)', 
            borderColor: 'var(--glass-border)' 
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="font-bold text-xl mb-6 flex items-center gap-2 theme-transition" style={{ color: 'var(--text-primary)' }}>
            <span>📚</span> Sessions
          </h3>
          <div className="space-y-3">
            {sessions.map((s, index) => (
              <motion.button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  if (s.id.startsWith('custom-')) {
                    if (window.confirm(`Are you sure you want to delete "${s.title}"?`)) {
                      deleteCustomSession(s.id);
                    }
                  }
                }}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 theme-transition ${
                  s.id === selectedId 
                    ? "bg-gradient-to-r from-indigo-500/30 to-purple-500/30 border-2 border-indigo-400 shadow-lg" 
                    : "hover:bg-white/10 border"
                }`}
                style={{ 
                  borderColor: s.id === selectedId ? '#6366f1' : 'var(--glass-border)',
                  background: s.id === selectedId ? undefined : 'var(--glass-bg)'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                title={s.id.startsWith('custom-') ? "Right-click to delete" : ""}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium theme-transition" style={{ color: 'var(--text-primary)' }}>{s.title}</div>
                    <div className="text-sm mt-1 theme-transition" style={{ color: 'var(--text-secondary)' }}>
                      {Math.round(s.duration / 60)} min • {s.type}
                  </div>
                    {s.breathingPattern && (
                      <div className="text-xs mt-1 theme-transition" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>
                        {s.breathingPattern.inhale}-{s.breathingPattern.hold1}-{s.breathingPattern.exhale}-{s.breathingPattern.hold2}
                </div>
                    )}
                    {s.id.startsWith('custom-') && (
                      <div className="text-xs mt-1 theme-transition" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
                        Right-click to delete
                      </div>
                    )}
                  </div>
                  <div className="text-lg">
                    {s.type === "guided" ? "🧘" : "💨"}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="mt-8 border-t pt-6 theme-transition" style={{ borderColor: 'var(--glass-border)' }}>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 theme-transition" style={{ color: 'var(--text-primary)' }}>
              <span>➕</span> Create Session
            </h4>
            <AddSessionForm onCreate={createCustomSession} />
          </div>

          <div className="mt-8 border-t pt-6 theme-transition" style={{ borderColor: 'var(--glass-border)' }}>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 theme-transition" style={{ color: 'var(--text-primary)' }}>
              <span>🎵</span> Settings
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block theme-transition" style={{ color: 'var(--text-primary)' }}>🎵 Meditation Audio</label>
                <div className="text-xs mb-2 theme-transition" style={{ color: 'var(--text-secondary)' }}>
                  Current: {selected.audio ? `${selected.audio} audio` : 'No audio'}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block theme-transition" style={{ color: 'var(--text-primary)' }}>🌧️ Ambient Sound</label>
                <select 
                  value={ambient} 
                  onChange={(e) => setAmbient(e.target.value)} 
                  className="w-full p-3 rounded-lg backdrop-blur-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 theme-transition"
                  style={{ 
                    background: 'var(--glass-bg)', 
                    borderColor: 'var(--glass-border)', 
                    color: 'var(--text-primary)' 
                  }}
                >
                  <option value="none">🔇 None</option>
                  <option value="rain">🌧️ Rain</option>
                  <option value="ocean">🌊 Ocean</option>
                  <option value="forest">🌲 Forest</option>
            </select>
              </div>

              <label className="flex items-center gap-3 theme-transition" style={{ color: 'var(--text-primary)' }}>
                <input 
                  type="checkbox" 
                  checked={lowBandwidth} 
                  onChange={(e) => setLowBandwidth(e.target.checked)}
                  className="w-4 h-4 rounded theme-transition"
                  style={{ 
                    borderColor: 'var(--glass-border)', 
                    background: 'var(--glass-bg)' 
                  }}
                />
                Low-bandwidth mode (disables audio)
            </label>
            </div>

            <div className="mt-6 p-4 rounded-lg theme-transition" style={{ background: 'var(--glass-bg)' }}>
              <div className="text-sm mb-2 theme-transition" style={{ color: 'var(--text-secondary)' }}>📈 Progress</div>
              <div className="theme-transition" style={{ color: 'var(--text-primary)' }}>
                Streak: <strong className="text-indigo-500">{meta.streak}</strong> days
          </div>
              <div className="mt-1 theme-transition" style={{ color: 'var(--text-primary)' }}>
                Badges: <span className="text-yellow-500">{(meta.badges || []).join(", ") || "None yet"}</span>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Modern Main Area */}
        <motion.main 
          className="col-span-1 lg:col-span-3 backdrop-blur-lg border rounded-2xl p-8 shadow-xl theme-transition"
          style={{ 
            background: 'var(--glass-bg)', 
            borderColor: 'var(--glass-border)' 
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-3 theme-transition" style={{ color: 'var(--text-primary)' }}>{selected.title}</h2>
              <p className="text-lg leading-relaxed theme-transition" style={{ color: 'var(--text-secondary)' }}>{selected.text}</p>
              {selected.breathingPattern && (
                <div className="mt-3 p-3 rounded-lg theme-transition" style={{ background: 'var(--glass-bg)' }}>
                  <div className="text-sm mb-1 theme-transition" style={{ color: 'var(--text-secondary)' }}>Breathing Pattern:</div>
                  <div className="font-mono theme-transition" style={{ color: 'var(--text-primary)' }}>
                    Inhale {selected.breathingPattern.inhale}s → 
                    Hold {selected.breathingPattern.hold1}s → 
                    Exhale {selected.breathingPattern.exhale}s → 
                    Hold {selected.breathingPattern.hold2}s
                  </div>
                  
                  {selected.id === "box-breathing" && (
                    <div className="mt-4">
                      <div className="text-sm mb-2 theme-transition" style={{ color: 'var(--text-secondary)' }}>
                        Breathing Speed: {breathingSpeed}x
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={breathingSpeed}
                        onChange={(e) => setBreathingSpeed(Number(e.target.value))}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(breathingSpeed - 0.5) / 1.5 * 100}%, var(--glass-border) ${(breathingSpeed - 0.5) / 1.5 * 100}%, var(--glass-border) 100%)`
                        }}
                      />
                      <div className="flex justify-between text-xs mt-1 theme-transition" style={{ color: 'var(--text-secondary)' }}>
                        <span>Slow</span>
                        <span>Normal</span>
                        <span>Fast</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="text-right">
              <div className="text-sm mb-1 theme-transition" style={{ color: 'var(--text-secondary)' }}>Time Remaining</div>
              <div className="text-4xl font-mono font-bold theme-transition" style={{ color: 'var(--text-primary)' }}>{formatTime(secondsLeft)}</div>
              {selected.type === "breathing" && running && (
                <div className="text-sm mt-2 theme-transition" style={{ color: 'var(--text-secondary)' }}>
                  Phase: {breathingPhase} • Cycle {breathingCycle + 1}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center my-12">
            <BreathingRing />
          </div>

          <div className="flex items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              {!running ? (
                <motion.button 
                  onClick={startSession} 
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ▶️ Start Session
                </motion.button>
              ) : (
                <motion.button 
                  onClick={pauseSession} 
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ⏸️ Pause
                </motion.button>
              )}

              <motion.button 
                onClick={() => quickSkip(30)} 
                className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ⏭️ Skip 30s
              </motion.button>

              <motion.button
                onClick={() => {
                  setSecondsLeft(selected.duration);
                  pauseSession();
                }}
                className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔄 Reset
              </motion.button>

              <motion.button
                onClick={() => {
                  // share session (uses Web Share API if available)
                  const text = `${selected.title} — ${Math.round(selected.duration / 60)} min`;
                  if (navigator.share) {
                    navigator.share({ title: selected.title, text });
                  } else {
                    navigator.clipboard.writeText(text);
                    alert("Session copied to clipboard");
                  }
                }}
                className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📤 Share
              </motion.button>
            </div>
          </div>

          {/* Modern Mood Tracking */}
          <div className="mt-8 border-t border-white/20 pt-6">
            <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <span>😊</span> Mood Tracking
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="text-lg font-medium text-white mb-4">Before Session</div>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <motion.button
                      key={n}
                      onClick={() => setMoodBefore(n)}
                      aria-label={`Mood ${n} before session`}
                      className={`px-4 py-3 rounded-xl font-bold text-lg transition-all duration-200 ${
                        moodBefore === n 
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-110" 
                          : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {n}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-lg font-medium text-white mb-4">After Session</div>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <motion.button
                      key={n}
                      onClick={() => setMoodAfter(n)}
                      aria-label={`Mood ${n} after session`}
                      className={`px-4 py-3 rounded-xl font-bold text-lg transition-all duration-200 ${
                        moodAfter === n 
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-110" 
                          : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {n}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-lg font-semibold text-white mb-2">📝 Session Details</div>
              <p className="text-white/80 leading-relaxed">{selected.text}</p>
              {lowBandwidth && (
                <div className="mt-3 p-2 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                  <p className="text-yellow-200 text-sm">⚠️ Low-bandwidth mode: audio & TTS disabled</p>
                </div>
              )}
            </div>
          </div>

          {/* Modern Insights & History */}
          <div className="mt-8 border-t border-white/20 pt-6">
            <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <span>📊</span> Insights & Progress
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h5 className="text-lg font-semibold text-white mb-4">📈 Mood Trends</h5>
                <div style={{ width: "100%", height: 200 }} className="mt-2">
                {moodData.length ? (
                  <ResponsiveContainer>
                    <LineChart data={moodData}>
                      <XAxis dataKey="name" hide />
                      <YAxis domain={[0, 5]} allowDecimals={false} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(0,0,0,0.8)', 
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '8px',
                            color: 'white'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="mood" 
                          stroke="#8b5cf6" 
                          strokeWidth={3} 
                          dot={{ r: 4, fill: '#8b5cf6' }} 
                        />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full text-white/60">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📊</div>
                        <div>Complete sessions to see mood trends</div>
                      </div>
                    </div>
                )}
              </div>
                <div className="mt-4 text-sm text-white/70">Total sessions: <strong className="text-indigo-300">{history.length}</strong></div>
            </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h5 className="text-lg font-semibold text-white mb-4">📚 Recent Sessions</h5>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                {history.slice(0, 6).map((h, idx) => (
                    <motion.div 
                      key={idx} 
                      className="p-3 rounded-lg bg-white/5 border border-white/10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="text-sm font-medium text-white">{h.title}</div>
                      <div className="text-xs text-white/60 mt-1">{new Date(h.date).toLocaleDateString()}</div>
                      <div className="text-xs mt-2 flex gap-2">
                        <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300">
                          Before: {h.moodBefore ?? "-"}
                        </span>
                        <span className="px-2 py-1 rounded bg-green-500/20 text-green-300">
                          After: {h.moodAfter ?? "-"}
                        </span>
                  </div>
                    </motion.div>
                ))}
              </div>

                <div className="mt-4 flex gap-2">
                  <motion.button
                  onClick={() => {
                    clearHistory();
                  }}
                    className="px-3 py-2 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🗑️ Clear
                  </motion.button>

                  <motion.button 
                    onClick={exportHistory} 
                    className="px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    📤 Export
                  </motion.button>
              </div>
            </div>
          </div>
          </div>
        </motion.main>
      </div>

      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-white/60 text-sm">
          Made with ❤️ — Find your inner peace, one breath at a time
        </div>
      </motion.div>
    </div>
  );
}


