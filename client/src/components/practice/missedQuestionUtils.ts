import type { RecentAttempt } from "../types/results";
import type { MissedQuestionCard } from "./types";

export const formatAnswer = (value?: string) => {
  if (!value) {
    return "No answer provided";
  }

  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed.filter(Boolean).join(" -> ") || "No answer provided";
    }

    if (parsed && typeof parsed === "object") {
      return Object.entries(parsed)
        .map(([key, answer]) => `${key}: ${String(answer)}`)
        .join("\n");
    }
  } catch {
    return value;
  }

  return value;
};

export const titleCase = (value?: string) =>
  (value || "question")
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const getMissedQuestionCards = (attempts: RecentAttempt[]): MissedQuestionCard[] =>
  attempts.flatMap((attempt) =>
    (attempt.responses || [])
      .filter((response) => !response.isCorrect)
      .map((response) => ({ response, attempt })),
  );
