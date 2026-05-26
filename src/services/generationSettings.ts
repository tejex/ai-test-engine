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

const minQuestionCount = 5;
const maxQuestionCount = 15;
const allowedDifficulties = new Set<GenerationDifficulty>(["easy", "medium", "hard"]);
const allowedQuestionMixes = new Set<GenerationQuestionMix>(["balanced", "recall", "application"]);

const normalizeQuestionCount = (value: unknown) => {
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    return defaultGenerationSettings.questionCount;
  }

  return Math.min(Math.max(Math.round(parsedValue), minQuestionCount), maxQuestionCount);
};

export function normalizeGenerationSettings(value: unknown): GenerationSettings {
  if (!value || typeof value !== "object") {
    return defaultGenerationSettings;
  }

  const settings = value as Partial<GenerationSettings>;
  const rawDifficulty = (value as { difficulty?: unknown }).difficulty;

  return {
    questionCount: normalizeQuestionCount(settings.questionCount),
    difficulty:
      rawDifficulty === "balanced"
        ? "medium"
        : settings.difficulty && allowedDifficulties.has(settings.difficulty)
          ? settings.difficulty
          : defaultGenerationSettings.difficulty,
    questionMix:
      settings.questionMix && allowedQuestionMixes.has(settings.questionMix)
        ? settings.questionMix
        : defaultGenerationSettings.questionMix,
  };
}
