import React, { useState } from 'react';
import { Timer, Sparkles, ScrollText, HelpCircle, Grid } from 'lucide-react';
import { CountdownTimer } from './components/CountdownTimer';
import { FireworkSimulator } from './components/FireworkSimulator';
import { ResolutionGenerator } from './components/ResolutionGenerator';
import { PersonalityQuiz } from './components/PersonalityQuiz';
import { ResolutionBingo } from './components/ResolutionBingo';

const features = [
  { id: 'countdown', icon: Timer, name: 'Countdown Timer', component: CountdownTimer },
  { id: 'fireworks', icon: Sparkles, name: 'Firework Simulator', component: FireworkSimulator },
  { id: 'resolutions', icon: ScrollText, name: 'Resolution Generator', component: ResolutionGenerator },
  { id: 'quiz', icon: HelpCircle, name: 'Personality Quiz', component: PersonalityQuiz },
  { id: 'bingo', icon: Grid, name: 'Resolution Bingo', component: ResolutionBingo },
];

function App() {
  const [activeFeature, setActiveFeature] = useState(features[0].id);

  const ActiveComponent = features.find(f => f.id === activeFeature)?.component || CountdownTimer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            New Year's Time wasting Hub
          </h1>
          <p className="text-gray-600">
            Lets start this new year by doing useless stuff!
          </p>
        </header>

        <nav className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {features.map(({ id, icon: Icon, name }) => (
              <button
                key={id}
                onClick={() => setActiveFeature(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeFeature === id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-indigo-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{name}</span>
              </button>
            ))}
          </div>
        </nav>

        <main className="max-w-3xl mx-auto">
          <ActiveComponent />
        </main>

        <footer className="text-center mt-12 text-gray-600">
          <p>Made with ❤️ coz i have nothing to do!</p>
        </footer>
      </div>
    </div>
  );
}

export default App;