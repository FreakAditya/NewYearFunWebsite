export interface Resolution {
  id: string;
  text: string;
  category: 'funny' | 'inspiring' | 'practical';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    value: string;
  }[];
}

export interface PersonalityResult {
  type: string;
  title: string;
  description: string;
  emoji: string;
}

export interface BingoCell {
  id: string;
  text: string;
  checked: boolean;
}