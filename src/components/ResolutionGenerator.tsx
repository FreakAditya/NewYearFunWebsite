import React, { useState } from 'react';
import { Shuffle } from 'lucide-react';

const resolutions = [
  { text: "Learn to actually reply to texts before they turn into ancient scrolls 📜", category: "funny" },
  { text: "Get fit... or at least find workout clothes that scream 'main character' 💪✨", category: "funny" },
  { text: "Master the art of leaving a party before it’s awkward 🕺🏽🚪", category: "practical" },
  { text: "Drink water like it’s a vibe, not a chore 💧✨", category: "flirty" },
  { text: "Learn to flirt without sending 72 TikToks first 😏", category: "roast" },
  { text: "Stop liking their IG stories... they know, bestie 👀📱", category: "roast" },
  { text: "Channel your inner chef and stop burning instant ramen 🍜🔥", category: "funny" },
  { text: "Go on a date... with yourself, because self-love is the blueprint 💕", category: "flirty" },
  { text: "Quit stalking your crush’s Spotify playlists and make your own 🔥🎧", category: "roast" },
  { text: "Start journaling, but keep it short... no novels in 2024 📝✨", category: "funny" },
];

export function ResolutionGenerator() {
  const [currentResolution, setCurrentResolution] = useState(resolutions[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateResolution = () => {
    setIsAnimating(true);
    const newResolution = resolutions[Math.floor(Math.random() * resolutions.length)];
    setCurrentResolution(newResolution);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Resolution Generator</h2>
        <p className="text-gray-600">Time to find a resolution that slays harder than your selfies 📸✨.</p>
      </div>

      <div className={`bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg mb-6 transform transition-all duration-300 ${
        isAnimating ? 'scale-105' : 'scale-100'
      }`}>
        <p className="text-white text-xl font-medium text-center">
          {currentResolution.text}
        </p>
      </div>

      <button
        onClick={generateResolution}
        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        <Shuffle className="w-5 h-5" />
        <span>Hit Me With Another</span>
      </button>
    </div>
  );
}