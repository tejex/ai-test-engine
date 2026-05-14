import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import type { RecentAttempt } from "../types/results";
import ResultAttemptCard from "./ResultAttemptCard";
import { useAppTheme } from "../../styles/ThemeModeProvider";

type ResultsGridProps = {
  attempts: RecentAttempt[];
  isLoading: boolean;
  latestAttemptId: string | null;
  deletingAttemptId: string | null;
  onOpenAttempt: (attemptId: string) => void;
  onDeleteAttempt: (attempt: RecentAttempt) => void;
};

export default function ResultsGrid({
  attempts,
  isLoading,
  latestAttemptId,
  deletingAttemptId,
  onOpenAttempt,
  onDeleteAttempt,
}: ResultsGridProps) {
  const { theme } = useAppTheme();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress sx={{ color: theme.accent }} />
      </Box>
    );
  }

  if (attempts.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          backgroundColor: theme.surface,
          border: `1px solid ${theme.borderStrong}`,
          borderRadius: 2,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: theme.text, fontWeight: 700 }}>
          No previous exams yet
        </Typography>
        <Typography sx={{ color: theme.mutedText, mt: 1 }}>
          Completed tests will show up here after you submit them.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          md: "repeat(3, minmax(0, 1fr))",
        },
        gap: 2,
      }}
    >
      {attempts.map((attempt) => (
        <ResultAttemptCard
          key={attempt.id}
          attempt={attempt}
          isLatest={attempt.id === latestAttemptId}
          isDeleting={deletingAttemptId === attempt.id}
          onOpen={() => onOpenAttempt(attempt.id)}
          onDelete={() => onDeleteAttempt(attempt)}
        />
      ))}
    </Box>
  );
}
