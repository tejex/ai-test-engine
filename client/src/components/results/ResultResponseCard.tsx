import { Box, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import type { ResultResponse } from "../types/results";
import { useAppTheme } from "../../styles/ThemeModeProvider";

type ResultResponseCardProps = {
  response: ResultResponse;
  index: number;
};

const formatAnswer = (value?: string) => {
  if (!value) {
    return "No answer provided";
  }

  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed.filter(Boolean).join(" -> ");
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

const DetailBlock = ({
  label,
  children,
  color,
  fontWeight = 400,
  mutedColor,
}: {
  label: string;
  children: string;
  color?: string;
  fontWeight?: number;
  mutedColor: string;
}) => (
  <Box>
    <Typography
      variant="subtitle2"
      sx={{
        color: mutedColor,
        mb: 1,
      }}
    >
      {label}
    </Typography>

    <Typography
      sx={{
        color,
        lineHeight: 1.8,
        fontWeight,
      }}
    >
      {children}
    </Typography>
  </Box>
);

export default function ResultResponseCard({ response, index }: ResultResponseCardProps) {
  const { theme } = useAppTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: theme.elevated,
        border: `1px solid ${theme.borderStrong}`,
        borderRadius: 4,
        p: 4,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "space-between", flex: 1, alignItems: "center", mb: 2 }}
      >
        <Typography
          variant="h6"
          sx={{
            color: theme.text,
            fontWeight: 600,
          }}
        >
          Question {index + 1}
        </Typography>

        <Chip
          label={response.isCorrect ? "Correct" : "Incorrect"}
          sx={{
            backgroundColor: response.isCorrect
              ? "rgba(34,197,94,0.15)"
              : "rgba(239,68,68,0.15)",
            color: response.isCorrect ? "#4ade80" : "#f87171",
            fontWeight: 600,
          }}
        />
      </Stack>

      <Typography
        variant="h5"
        sx={{
          color: theme.text,
          fontWeight: 600,
          mb: 3,
        }}
      >
        {response.question.question}
      </Typography>

      <Divider
        sx={{
          borderColor: theme.borderStrong,
          mb: 3,
        }}
      />

      <Stack spacing={3}>
        <DetailBlock label="YOUR ANSWER" color={theme.text} mutedColor={theme.mutedText}>
          {formatAnswer(response.userAnswer)}
        </DetailBlock>
        <DetailBlock label="CORRECT ANSWER" color={theme.accent} fontWeight={500} mutedColor={theme.mutedText}>
          {formatAnswer(response.question.correctAnswer)}
        </DetailBlock>
        <DetailBlock label="AI FEEDBACK" color={theme.subtleText} mutedColor={theme.mutedText}>
          {response.feedback}
        </DetailBlock>
        <DetailBlock label="EXPLANATION" color={theme.subtleText} mutedColor={theme.mutedText}>
          {response.question.explanation}
        </DetailBlock>
      </Stack>
    </Paper>
  );
}
