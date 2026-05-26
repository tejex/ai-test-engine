import { useState } from "react";
import { Box, Chip, Collapse, Divider, Paper, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import type { ResultResponse } from "../types/results";
import AppButton from "../AppButton";
import { useAppTheme } from "../../styles/ThemeModeProvider";
import { formatAnswer, titleCase } from "./resultUtils";

type ResultQuestionReviewPanelProps = {
  response: ResultResponse;
  index: number;
  totalCount: number;
  onPrevious: () => void;
  onNext: () => void;
};

type AnswerBlockProps = {
  label: string;
  value: string;
  tone: "danger" | "success" | "accent";
};

function AnswerBlock({ label, value, tone }: AnswerBlockProps) {
  const { theme } = useAppTheme();
  const colors = {
    danger: {
      border: "rgba(220, 38, 38, 0.28)",
      background: "rgba(220, 38, 38, 0.08)",
      text: theme.danger,
    },
    success: {
      border: "rgba(34, 197, 94, 0.28)",
      background: "rgba(34, 197, 94, 0.08)",
      text: "#16a34a",
    },
    accent: {
      border: theme.borderStrong,
      background: theme.panel,
      text: theme.accent,
    },
  }[tone];

  return (
    <Box
      sx={{
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.background,
        borderRadius: 2,
        p: 2,
      }}
    >
      <Typography sx={{ color: colors.text, fontSize: 12, fontWeight: 900, textTransform: "uppercase", mb: 1 }}>
        {label}
      </Typography>
      <Typography
        component="pre"
        sx={{
          color: theme.text,
          whiteSpace: "pre-wrap",
          fontFamily: "inherit",
          lineHeight: 1.7,
          m: 0,
          fontSize: 14,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function CollapsibleTextBlock({ label, value }: { label: string; value: string }) {
  const { theme } = useAppTheme();
  const [expanded, setExpanded] = useState(false);
  const shouldCollapse = value.length > 220;
  const visibleValue = shouldCollapse && !expanded ? `${value.slice(0, 220)}...` : value;

  return (
    <Box
      sx={{
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.panel,
        borderRadius: 2,
        p: 2,
      }}
    >
      <Typography sx={{ color: theme.accent, fontSize: 12, fontWeight: 900, textTransform: "uppercase", mb: 1 }}>
        {label}
      </Typography>
      <Collapse in={expanded || !shouldCollapse} collapsedSize={72}>
        <Typography sx={{ color: theme.subtleText, lineHeight: 1.75, fontSize: 14 }}>
          {visibleValue}
        </Typography>
      </Collapse>
      {shouldCollapse ? (
        <Box
          component="button"
          onClick={() => setExpanded((current) => !current)}
          sx={{
            mt: 1,
            p: 0,
            border: 0,
            background: "transparent",
            color: theme.accent,
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 13,
            fontWeight: 800,
            display: "inline-flex",
            alignItems: "center",
            gap: 0.35,
          }}
        >
          {expanded ? "Show less" : "Show more"}
          {expanded ? <KeyboardArrowUpIcon sx={{ fontSize: 16 }} /> : <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />}
        </Box>
      ) : null}
    </Box>
  );
}

export default function ResultQuestionReviewPanel({
  response,
  index,
  totalCount,
  onPrevious,
  onNext,
}: ResultQuestionReviewPanelProps) {
  const { theme } = useAppTheme();
  const StatusIcon = response.isCorrect ? CheckCircleIcon : CancelIcon;
  const statusColor = response.isCorrect ? "#22c55e" : theme.danger;

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: theme.surface,
        border: `1px solid ${theme.borderStrong}`,
        borderRadius: 2,
        p: { xs: 2, md: 3 },
        minHeight: 540,
      }}
    >
      <Stack spacing={2.5}>
        <Stack direction="row" spacing={1.2} sx={{ alignItems: "center", flexWrap: "wrap" }}>
          <StatusIcon sx={{ color: statusColor, fontSize: 20 }} />
          <Typography sx={{ color: statusColor, fontWeight: 900 }}>
            {response.isCorrect ? "Correct" : "Incorrect"}
          </Typography>
          <Typography sx={{ color: theme.mutedText }}>·</Typography>
          <Typography sx={{ color: theme.mutedText, fontWeight: 800 }}>Q{index + 1}</Typography>
          <Typography sx={{ color: theme.mutedText }}>·</Typography>
          <Chip
            size="small"
            label={titleCase(response.question.type)}
            sx={{ backgroundColor: theme.panel, color: theme.mutedText, fontWeight: 700 }}
          />
          <Chip
            size="small"
            label={titleCase(response.question.difficulty)}
            sx={{ backgroundColor: theme.accentSoft, color: theme.accent, fontWeight: 800 }}
          />
        </Stack>

        <Typography sx={{ color: theme.text, fontSize: { xs: 18, md: 20 }, fontWeight: 900, lineHeight: 1.45 }}>
          {response.question.question}
        </Typography>

        <Stack spacing={2}>
          <AnswerBlock
            label="Your answer"
            value={formatAnswer(response.userAnswer)}
            tone={response.isCorrect ? "success" : "danger"}
          />
          <AnswerBlock
            label="Correct answer"
            value={formatAnswer(response.question.correctAnswer)}
            tone="success"
          />
          <CollapsibleTextBlock label="AI feedback" value={response.feedback || "No feedback available."} />
          <CollapsibleTextBlock label="Explanation" value={response.question.explanation || "No explanation available."} />
        </Stack>

        <Divider sx={{ borderColor: theme.border }} />

        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: 2 }}>
          <AppButton
            variant="outlined"
            disabled={index === 0}
            onClick={onPrevious}
            sx={{
              borderColor: theme.borderStrong,
              color: theme.text,
              "&.Mui-disabled": { borderColor: theme.border, color: theme.mutedText },
            }}
          >
            Previous
          </AppButton>
          <Typography sx={{ color: theme.mutedText, fontSize: 13 }}>
            Question {index + 1} of {totalCount}
          </Typography>
          <AppButton
            variant="outlined"
            disabled={index === totalCount - 1}
            onClick={onNext}
            sx={{
              borderColor: theme.borderStrong,
              color: theme.text,
              "&.Mui-disabled": { borderColor: theme.border, color: theme.mutedText },
            }}
          >
            Next
          </AppButton>
        </Stack>
      </Stack>
    </Paper>
  );
}
