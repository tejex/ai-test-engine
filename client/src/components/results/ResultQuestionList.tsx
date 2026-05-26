import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import type { ResultResponse } from "../types/results";
import { useAppTheme } from "../../styles/ThemeModeProvider";
import { titleCase } from "./resultUtils";

export type ResultFilter = "all" | "missed" | "correct";

type ResultQuestionListProps = {
  responses: ResultResponse[];
  visibleItems: Array<{ response: ResultResponse; index: number }>;
  selectedIndex: number;
  filter: ResultFilter;
  onFilterChange: (filter: ResultFilter) => void;
  onSelect: (index: number) => void;
};

const getPreview = (value: string) => (value.length > 72 ? `${value.slice(0, 72)}...` : value);

export default function ResultQuestionList({
  responses,
  visibleItems,
  selectedIndex,
  filter,
  onFilterChange,
  onSelect,
}: ResultQuestionListProps) {
  const { theme } = useAppTheme();
  const correctCount = responses.filter((response) => response.isCorrect).length;
  const missedCount = responses.length - correctCount;
  const filters = [
    { value: "all" as const, label: "All", count: responses.length },
    { value: "missed" as const, label: "Missed", count: missedCount },
    { value: "correct" as const, label: "Correct", count: correctCount },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: theme.surface,
        border: `1px solid ${theme.borderStrong}`,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Stack direction="row" spacing={1} sx={{ p: 1.25, borderBottom: `1px solid ${theme.border}` }}>
        {filters.map((item) => {
          const active = filter === item.value;

          return (
            <Box
              key={item.value}
              component="button"
              onClick={() => onFilterChange(item.value)}
              sx={{
                border: `1px solid ${active ? theme.borderStrong : "transparent"}`,
                backgroundColor: active ? theme.panel : "transparent",
                color: active ? theme.text : theme.mutedText,
                borderRadius: 1.25,
                cursor: "pointer",
                fontFamily: "inherit",
                px: 1.5,
                py: 0.9,
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                fontWeight: 800,
                "&:hover": {
                  backgroundColor: theme.panel,
                },
              }}
            >
              <span>{item.label}</span>
              <Typography component="span" sx={{ color: active ? theme.text : theme.mutedText, fontSize: 12 }}>
                {item.count}
              </Typography>
            </Box>
          );
        })}
      </Stack>

      <Stack
        spacing={0.5}
        sx={{
          p: 1,
          maxHeight: { xs: 260, lg: "calc(100vh - 290px)" },
          overflowY: "auto",
        }}
      >
        {visibleItems.map(({ response, index }) => {
          const active = index === selectedIndex;
          const statusColor = response.isCorrect ? "#22c55e" : theme.danger;

          return (
            <Box
              key={response.id}
              component="button"
              onClick={() => onSelect(index)}
              sx={{
                width: "100%",
                textAlign: "left",
                border: `1px solid ${active ? theme.accent : "transparent"}`,
                backgroundColor: active ? theme.accentSoft : "transparent",
                borderRadius: 1.5,
                cursor: "pointer",
                p: 1.4,
                fontFamily: "inherit",
                "&:hover": {
                  backgroundColor: active ? theme.accentSoft : theme.panel,
                },
              }}
            >
              <Stack direction="row" spacing={1.15} sx={{ alignItems: "flex-start" }}>
                {response.isCorrect ? (
                  <CheckCircleIcon sx={{ color: statusColor, fontSize: 18, mt: 0.2 }} />
                ) : (
                  <CancelIcon sx={{ color: statusColor, fontSize: 18, mt: 0.2 }} />
                )}

                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", flexWrap: "wrap" }}>
                    <Typography sx={{ color: theme.text, fontWeight: 900, fontSize: 13 }}>
                      Q{index + 1}
                    </Typography>
                    <Typography sx={{ color: theme.mutedText, fontSize: 12 }}>
                      {titleCase(response.question.type)}
                    </Typography>
                    <Chip
                      size="small"
                      label={titleCase(response.question.difficulty)}
                      sx={{
                        height: 20,
                        backgroundColor: response.isCorrect ? "rgba(34, 197, 94, 0.12)" : theme.dangerSoft,
                        color: response.isCorrect ? "#16a34a" : theme.danger,
                        fontSize: 11,
                        fontWeight: 800,
                      }}
                    />
                  </Stack>

                  <Typography sx={{ color: theme.mutedText, fontSize: 12, mt: 0.5, lineHeight: 1.45 }}>
                    {getPreview(response.question.question)}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Paper>
  );
}
