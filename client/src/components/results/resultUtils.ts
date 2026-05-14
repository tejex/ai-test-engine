import type { AppTheme } from "../../styles/theme";

export const formatResultDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export const getScoreTone = (score: number, theme: AppTheme) => {
  if (score >= 0.8) {
    return { bg: theme.accent, color: "#ffffff", label: "Strong" };
  }

  if (score >= 0.6) {
    return { bg: theme.accentSoft, color: theme.accent, label: "Steady" };
  }

  return { bg: "rgba(245, 158, 11, 0.16)", color: "#b45309", label: "Review" };
};
