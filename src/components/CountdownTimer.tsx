import React, { useState, useEffect } from 'react';
import { PartyPopper } from 'lucide-react';

const funnyMessages = [
  "New year, new me? Nah, still gonna watch a lot of reels",
  "Let's manifest iss saal to body bna ke rahunga💪",
  "2025: This year will bring downfall with hairloss💀",
  "Iss saal bhi Sab cuddle karenge 🤗, tu struggle karega 😂😂",
  "Gym? I meant Going to My bed🛌💤",
  "Agar gay hua to instagram deactivate karega iss saal",
  "2025 = Flirting over memes, not texts 📲😂",
  "This year, I'll actually reply to messages... maybe 🙃✌️",
  "More adventures, more overthinking, more delulu 🌍🤯",
  "Daal me protein nahi hota BKL whey lele 😂",
  "Iss saal beard aa ke rahegi🧔‍♂️",
  "Manifesting a 'Netflix & chill' moment this year 📺🍿😉",
];

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [message, setMessage] = useState(funnyMessages[0]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const newYear = new Date(now.getFullYear() + 1, 0, 1);
      const difference = newYear.getTime() - now.getTime();

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    const messageTimer = setInterval(() => {
      setMessage(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);
    }, 5000); // Change message every 5 seconds

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, []);

  return (
    <div className="text-center p-8">
      <div className="flex items-center justify-center mb-6">
        <PartyPopper className="w-8 h-8 mr-2 text-yellow-500" />
        <h2 className="text-3xl font-bold">Countdown to 2025!</h2>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="bg-white p-4 rounded-lg shadow-lg">
            <div className="text-4xl font-bold text-indigo-600">
              {String(value).padStart(2, '0')}
            </div>
            <div className="text-gray-600 capitalize">{unit}</div>
          </div>
        ))}
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg">
        <p className="text-lg text-gray-800 italic">{message}</p>
      </div>
    </div>
  );
}
