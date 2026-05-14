export type RecentAttempt = {
  id: string;
  score: number;
  createdAt: string;
  test?: {
    id: string;
    createdAt?: string;
    document?: {
      title?: string;
    };
  };
};

export type ResultResponse = {
  id: string;
  userAnswer?: string;
  isCorrect: boolean;
  feedback: string;
  question: {
    question: string;
    correctAnswer: string;
    explanation: string;
  };
};

export type AttemptResult = {
  id: string;
  score: number;
  responses: ResultResponse[];
};
