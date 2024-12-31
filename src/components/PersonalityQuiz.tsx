import React, { useState } from 'react';
import { HelpCircle, Award } from 'lucide-react';

const questions = [
  {
    id: '1',
    question: "What's your New Year's Eve personality?",
    options: [
      { text: "I’m the DJ of every party 🎶", value: "social" },
      { text: "Couch + snacks + Netflix = perfection 🍿", value: "chill" },
      { text: "Skydiving into the new year, maybe? 🪂", value: "adventurous" },
      { text: "Midnight? I’m already dreaming 😴", value: "practical" }
    ]
  },
  {
    id: '2',
    question: "Pick your ultimate New Year's resolution:",
    options: [
      { text: "Finally becoming TikTok famous 📱✨", value: "social" },
      { text: "Keeping a planner for more than a week 📅", value: "practical" },
      { text: "Solo trip to somewhere exotic ✈️", value: "adventurous" },
      { text: "Meditate and vibe all year 🌿", value: "chill" }
    ]
  },
  {
    id: '3',
    question: "Your New Year's Day vibe is:",
    options: [
      { text: "Bottomless brunch with the squad 🥂", value: "social" },
      { text: "Organizing my closet for once 👗", value: "practical" },
      { text: "Hiking to some random waterfall 🏞️", value: "adventurous" },
      { text: "Manifesting in my PJs ✨", value: "chill" }
    ]
  }
];

const results = {
  social: {
    type: "social",
    title: "The Party Powerhouse 🎉",
    description: "You're the glitter glue that holds every party together. Even 2025 can't keep up with your vibes! 💃🕺",
    emoji: "🎊"
  },
  practical: {
    type: "practical",
    title: "The Spreadsheet Savior 📋",
    description: "You probably already have your 2025 budget planned. Do spreadsheets come with capes now? 🦸‍♂️",
    emoji: "📊"
  },
  adventurous: {
    type: "adventurous",
    title: "The Thrill Chaser 🌍",
    description: "Your idea of 'calm' is bungee jumping into next year. We get it, you're cooler than all of us. 😎",
    emoji: "🪂"
  },
  chill: {
    type: "chill",
    title: "The Zen Master 🧘",
    description: "While the world stresses over resolutions, you're sipping tea and manifesting good vibes. Teach us your ways. ☕✨",
    emoji: "🌿"
  }
};

export function PersonalityQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    setShowResult(true);
  };

  const getResult = () => {
    const counts: Record<string, number> = answers.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const personalityType = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    return results[personalityType as keyof typeof results];
  };

  if (showResult) {
    const result = getResult();
    return (
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <div className="text-6xl mb-4">{result.emoji}</div>
        <h2 className="text-2xl font-bold text-indigo-600 mb-2">{result.title}</h2>
        <p className="text-gray-600 mb-6">{result.description}</p>
        <button
          onClick={() => {
            setShowResult(false);
            setCurrentQuestion(0);
            setAnswers([]);
          }}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Take Quiz Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <HelpCircle className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold">What's Your New Year Energy? 🔥</h2>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl mb-4">{questions[currentQuestion].question}</h3>
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-600 transition-colors"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}