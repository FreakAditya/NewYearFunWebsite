import React, { useState } from 'react';
import { CheckSquare, Trophy } from 'lucide-react';

const bingoItems = [
  "Drink more water",
  "Exercise regularly",
  "Learn something new",
  "Read more books",
  "Save money",
  "Eat healthier",
  "Travel somewhere new",
  "Meditate daily",
  "Call family more",
  "Start a hobby",
  "Volunteer",
  "Get organized",
  "Wake up earlier",
  "Reduce screen time",
  "Practice gratitude",
  "Network more",
];

export function ResolutionBingo() {
  const [board, setBoard] = useState(() => {
    const shuffled = [...bingoItems]
      .sort(() => Math.random() - 0.5)
      .slice(0, 16)
      .map((text, id) => ({ id: String(id), text, checked: false }));
    return shuffled;
  });

  const [hasWon, setHasWon] = useState(false);

  const checkWin = (newBoard: typeof board) => {
    // Check rows
    for (let i = 0; i < 4; i++) {
      if (newBoard.slice(i * 4, (i + 1) * 4).every(cell => cell.checked)) {
        return true;
      }
    }

    // Check columns
    for (let i = 0; i < 4; i++) {
      if ([0, 1, 2, 3].every(j => newBoard[i + j * 4].checked)) {
        return true;
      }
    }

    // Check diagonals
    if ([0, 5, 10, 15].every(i => newBoard[i].checked)) return true;
    if ([3, 6, 9, 12].every(i => newBoard[i].checked)) return true;

    return false;
  };

  const toggleCell = (id: string) => {
    const newBoard = board.map(cell =>
      cell.id === id ? { ...cell, checked: !cell.checked } : cell
    );
    setBoard(newBoard);
    setHasWon(checkWin(newBoard));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Resolution Bingo</h2>
        <p className="text-gray-600">Complete 4 in a row to win!</p>
      </div>

      {hasWon && (
        <div className="mb-6 bg-green-100 p-4 rounded-lg flex items-center justify-center space-x-2">
          <Trophy className="w-6 h-6 text-green-600" />
          <span className="text-green-800 font-medium">Congratulations! You've won a date with me 😉!</span>
        </div>
      )}

      <div className="grid grid-cols-4 gap-2">
        {board.map((cell) => (
          <button
            key={cell.id}
            onClick={() => toggleCell(cell.id)}
            className={`aspect-square p-2 rounded-lg border-2 transition-all ${
              cell.checked
                ? 'bg-indigo-100 border-indigo-600'
                : 'border-gray-200 hover:border-indigo-400'
            }`}
          >
            <div className="h-full flex flex-col items-center justify-center text-center">
              <span className="text-sm">{cell.text}</span>
              {cell.checked && (
                <CheckSquare className="w-4 h-4 text-indigo-600 mt-1" />
              )}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          setBoard(board.map(cell => ({ ...cell, checked: false })));
          setHasWon(false);
        }}
        className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Reset Board
      </button>
    </div>
  );
}