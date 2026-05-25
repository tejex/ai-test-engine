import type { RecentAttempt } from "../components/types/results";

type AccuracyItem = {
  label: string;
  value: number;
  total: number;
};

const formatDateKey = (date: Date) => date.toISOString().slice(0, 10);

const percentage = (value: number) => `${Math.round(value * 100)}%`;

const titleCase = (value: string) =>
  value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const getActiveDayKeys = (attempts: RecentAttempt[]) =>
  new Set(attempts.map((attempt) => formatDateKey(new Date(attempt.createdAt))));

const getCurrentStreak = (activeDays: Set<string>) => {
  let streak = 0;
  const cursor = new Date();

  while (activeDays.has(formatDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};

const getAccuracyGroups = (
  attempts: RecentAttempt[],
  key: "type" | "difficulty",
): AccuracyItem[] => {
  const groups = new Map<string, { correct: number; total: number }>();

  attempts.forEach((attempt) => {
    attempt.responses?.forEach((response) => {
      const groupName = response.question[key] || "unknown";
      const current = groups.get(groupName) || { correct: 0, total: 0 };

      current.total += 1;
      if (response.isCorrect) {
        current.correct += 1;
      }

      groups.set(groupName, current);
    });
  });

  return Array.from(groups.entries())
    .map(([label, group]) => ({
      label: titleCase(label),
      value: group.total ? group.correct / group.total : 0,
      total: group.total,
    }))
    .sort((a, b) => a.value - b.value);
};

export const getDashboardMetrics = (attempts: RecentAttempt[]) => {
  const activeDays = getActiveDayKeys(attempts);
  const responses = attempts.flatMap((attempt) => attempt.responses || []);
  const correctResponses = responses.filter((response) => response.isCorrect);
  const missedResponses = responses.filter((response) => !response.isCorrect);
  const averageScore =
    attempts.length > 0
      ? attempts.reduce((total, attempt) => total + attempt.score, 0) / attempts.length
      : 0;

  const sortedOldestFirst = [...attempts].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
  const scoreTrend = sortedOldestFirst.slice(-6).map((attempt) => Math.round(attempt.score * 100));
  const bestAttempt = attempts.reduce<RecentAttempt | null>(
    (best, attempt) => (!best || attempt.score > best.score ? attempt : best),
    null,
  );

  return {
    activeDaysThisMonth: Array.from(activeDays).filter((day) => {
      const date = new Date(day);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length,
    currentStreak: getCurrentStreak(activeDays),
    testsCompleted: attempts.length,
    questionsAnswered: responses.length,
    averageScore,
    averageScoreText: percentage(averageScore),
    missedQuestions: missedResponses.length,
    correctQuestions: correctResponses.length,
    recoveryRateText: missedResponses.length ? "Ready" : "Clear",
    scoreTrend,
    bestScoreText: bestAttempt ? percentage(bestAttempt.score) : "0%",
    activeDays,
    accuracyByType: getAccuracyGroups(attempts, "type"),
    accuracyByDifficulty: getAccuracyGroups(attempts, "difficulty"),
    weakestType: getAccuracyGroups(attempts, "type")[0],
    recentAttempts: attempts.slice(0, 3),
  };
};
