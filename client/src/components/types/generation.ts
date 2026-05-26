export type GenerationDifficulty = "easy" | "medium" | "hard";

export type GenerationQuestionMix = "balanced" | "recall" | "application";

export type GenerationSettings = {
  questionCount: number;
  difficulty: GenerationDifficulty;
  questionMix: GenerationQuestionMix;
};

export const defaultGenerationSettings: GenerationSettings = {
  questionCount: 8,
  difficulty: "medium",
  questionMix: "balanced",
};
