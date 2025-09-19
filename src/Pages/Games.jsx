import React from "react";
import { Link } from "react-router-dom";

const games = {
  "Calm & Relax": [
    {
      title: "Positive Quotes",
      desc: "Click to get random uplifting affirmations.",
      link: "https://www.reliablesoft.net/ai-text-generator-tools/quote-generator/",
      img: "https://img.freepik.com/premium-vector/hand-drawn-doodle-rectangular-quote-boxe-speech-bubble-sketch-vector-frame_567896-95.jpg",
    },
    {
      title: "Gratitude Wall",
      desc: "Write what you're grateful for and pin it.",
      link: "https://padlet.com/claudia_ont1/virtual-gratitude-wall-wlh1ca19cxy30wi2",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvMDFzhnFGzX2SoVOVcmMqcPSh5_IXrZhNzX3GztDc6g&s&ec=73068123",
    },
  ],
  "Playful Stress Busters": [
    {
      title: "Ball Bounce",
      desc: "Spawn bouncing balls and watch them move.",
      link: "https://www.crazygames.com/game/bounce-return-on-the-old-phone",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Vfoy7lq7cbHC8LONHI_ngoytZ-PXww5E7w&s",
    },
    {
      title: "Stress Smash",
      desc: "Pop balloons with stress words to feel better.",
      link: "https://www.crazygames.com/game/bloons",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lZLO5Z985GlJ7IyQ9X3RCtl2LJPhcCaRHw&s",
    },
  ],
  "Focus & Mind Games": [
    {
      title: "Memory Match",
      desc: "Flip cards to find pairs and test memory.",
      link: "https://santatracker.google.com/matching.html",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5lEk3kokJNDh8oTK6Lh2Itibv9R9hLDos-Q&s",
    },
    {
      title: "Coloring Canvas",
      desc: "Fill mandalas and doodles with calming colors.",
      link: "https://www.construct.net/en/free-online-games/coloring-canvas-72017/play",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe_t72giSANawZLkHYUfUuZHlwN0Ey2ldLrA&s",
    },
    {
      title: "Reaction Timer",
      desc: "Click fast when the screen changes color.",
      link: "https://assets.gskstatic.com/corporate/gskstemeducation.com/reaction-test/index.html",
      img: "https://img.itch.zone/aW1nLzE2MTg3NDkxLnBuZw==/original/zPGOF8.png",
    },
  ],
};

const Games = () => {
  return (
    <div className="min-h-screen bg-[#e6def8] p-8">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        Stress Relief & Mind Games
      </h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Calm & Relax</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {games["Calm & Relax"].map((game, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-xl shadow-lg text-base max-w-md w-full flex flex-col items-center"
            >
              <img
                className="rounded-md h-48 w-full object-cover mb-3"
                src={game.img}
                alt={game.title}
              />
              <p className="text-indigo-800 text-2xl font-semibold text-center mt-2">
                {game.title}
              </p>
              <p className="text-gray-600 mt-3 text-center">{game.desc}</p>
              <button
                type="button"
                className="bg-indigo-600 mt-6 mb-2 px-8 py-3 font-bold rounded-lg text-lg text-white hover:bg-indigo-500 transition"
                onClick={() => (window.location.href = game.link)}
              >
                Play Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Playful Stress Busters</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {games["Playful Stress Busters"].map((game, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-xl shadow-lg text-base max-w-md w-full flex flex-col items-center"
            >
              <img
                className="rounded-md h-48 w-full object-cover mb-3"
                src={game.img}
                alt={game.title}
              />
              <p className="text-indigo-800 text-2xl font-semibold text-center mt-2">
                {game.title}
              </p>
              <p className="text-gray-600 mt-3 text-center">{game.desc}</p>
              <button
                type="button"
                className="bg-indigo-600 mt-6 mb-2 px-8 py-3 font-bold rounded-lg text-lg text-white hover:bg-indigo-500 transition"
                onClick={() => (window.location.href = game.link)}
              >
                Play Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Focus & Mind Games</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {games["Focus & Mind Games"].map((game, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-xl shadow-lg text-base max-w-md w-full flex flex-col items-center"
            >
              <img
                className="rounded-md h-48 w-full object-cover mb-3"
                src={game.img}
                alt={game.title}
              />
              <p className="text-indigo-800 text-2xl font-semibold text-center mt-2">
                {game.title}
              </p>
              <p className="text-gray-600 mt-3 text-center">{game.desc}</p>
              <button
                type="button"
                className="bg-indigo-600 mt-6 mb-2 px-8 py-3 font-bold rounded-lg text-lg text-white hover:bg-indigo-500 transition"
                onClick={() => (window.location.href = game.link)}
              >
                Play Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Games;
