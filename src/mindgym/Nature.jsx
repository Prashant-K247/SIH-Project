import React, { useState } from "react";

const Nature = () => {
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Take a mindful walk in the park", done: false },
    { id: 2, text: "Listen to birds chirping", done: false },
    { id: 3, text: "Spend 10 minutes watching the sky", done: false },
    { id: 4, text: "Sit under a tree and breathe deeply", done: false },
  ]);

  const toggleCheck = (id) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 text-gray-800">
      <section
        className="relative min-h-screen flex items-center justify-center text-center px-6 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1487202212798-4f11d5c8f57d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className=" p-10 rounded-xl inline-block">
          <h1 className="text-4xl md:text-7xl font-bold text-white">
            Spending Time in Nature
          </h1>
          <p className="mt-4 text-lg text-white max-w-2xl mx-auto">
            “Nature is not a place to visit. It is home.”  </p>
            <p className="text-lg text-white">
            Step outside, breathe, and reconnect with the earth.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-10">
          🌿 Why Nature Helps?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Stress Relief", desc: "Spending time outdoors lowers stress and anxiety levels." },
            { title: "Focus & Creativity", desc: "Nature walks improve attention span and creativity." },
            { title: "Better Mood", desc: "Greenery and sunlight boost positivity and mental health." },
            { title: "Physical Health", desc: "Fresh air and movement improve sleep and energy." },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-green-800 mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-12 bg-green-100">
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-10">
          🍃 Activities to Try
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            "Take a short walk in the park",
            "Do outdoor yoga or meditation",
            "Try gardening or planting trees",
            "Go birdwatching or stargazing",
            "Write or sketch in a nature journal",
            "Spend 10 minutes breathing fresh air",
          ].map((activity, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 hover:bg-green-50 transition"
            >
              <p className="text-gray-700">{activity}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
          Your Nature Checklist
        </h2>
        <ul className="space-y-4">
          {checklist.map((item) => (
            <li
              key={item.id}
              className={`flex items-center p-4 rounded-lg shadow-md cursor-pointer transition ${
                item.done ? "bg-green-200" : "bg-white hover:bg-green-50"
              }`}
              onClick={() => toggleCheck(item.id)}
            >
              <input
                type="checkbox"
                checked={item.done}
                readOnly
                className="mr-3 h-5 w-5"
              />
              <span
                className={`text-gray-700 ${
                  item.done ? "line-through text-gray-500" : ""
                }`}
              >
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-6 py-12 bg-blue-50">
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-10">
          Nature Gallery
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
          ].map((src, index) => (
            <img
              key={index}
              src={src}
              alt="nature"
              className="w-full h-64 object-cover rounded-xl shadow-md hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </section>


      <section className="w-full h-screen flex flex-col items-center justify-center bg-green-50">
      <h2 className="text-2xl font-semibold mb-4 text-green-800">Relax with Nature Sounds</h2>

      <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-lg">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/1ZYbU82GVz4?autoplay=0&loop=1"
          title="Nature Sounds"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>

      <section className="px-6 py-16 text-center bg-green-100">
        <blockquote className="italic text-lg text-gray-600 max-w-2xl mx-auto">
          “Look deep into nature, and then you will understand everything better.”
          <br /> — Albert Einstein
        </blockquote>
      </section>
    </div>
  );
};

export default Nature;
