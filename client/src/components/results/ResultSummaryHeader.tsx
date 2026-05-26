import { Box, Paper, Stack, Typography } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import AppButton from "../AppButton";
import { useAppTheme } from "../../styles/ThemeModeProvider";

type ResultSummaryHeaderProps = {
  title: string;
  percentage: number;
  correctCount: number;
  totalCount: number;
  missedCount: number;
  submittedAt?: string | undefined;
  onPracticeMissed: () => void | Promise<void>;
};

export default function ResultSummaryHeader({
  title,
  percentage,
  correctCount,
  totalCount,
  missedCount,
  submittedAt,
  onPracticeMissed,
}: ResultSummaryHeaderProps) {
  const { theme } = useAppTheme();
  const displayDate = submittedAt
    ? new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(submittedAt))
    : "Completed";

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: theme.surface,
        border: `1px solid ${theme.borderStrong}`,
        borderRadius: 2,
        p: { xs: 2.5, md: 3 },
        mb: 2.5,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2.5}
        sx={{
          alignItems: { md: "center" },
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: "center", minWidth: 0 }}>
          <Box
            sx={{
              width: 78,
              height: 78,
              borderRadius: "50%",
              flex: "0 0 auto",
              background: `conic-gradient(${theme.accent} ${percentage * 3.6}deg, ${theme.panel} 0deg)`,
              display: "grid",
              placeItems: "center",
            }}
          >
            <Box
              sx={{
                width: 62,
                height: 62,
                borderRadius: "50%",
                backgroundColor: theme.surface,
                display: "grid",
                placeItems: "center",
                border: `1px solid ${theme.border}`,
              }}
            >
              <Typography sx={{ color: theme.text, fontWeight: 900 }}>{percentage}%</Typography>
            </Box>
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                color: theme.text,
                fontSize: { xs: 18, md: 20 },
                fontWeight: 900,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </Typography>

            <Typography sx={{ color: theme.mutedText, mt: 0.5, fontSize: 13 }}>
              Submitted {displayDate}
            </Typography>
          </Box>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ alignItems: { sm: "center" }, justifyContent: "flex-end" }}
        >
          <Stack direction="row" spacing={2.5}>
            <Box>
              <Typography sx={{ color: "#22c55e", fontWeight: 900, fontSize: 18 }}>
                {correctCount} / {totalCount}
              </Typography>
              <Typography sx={{ color: theme.mutedText, fontSize: 12 }}>Correct</Typography>
            </Box>
            <Box>
              <Typography sx={{ color: theme.danger, fontWeight: 900, fontSize: 18 }}>
                {missedCount}
              </Typography>
              <Typography sx={{ color: theme.mutedText, fontSize: 12 }}>Missed</Typography>
            </Box>
            <Box>
              <Typography sx={{ color: theme.accent, fontWeight: 900, fontSize: 18 }}>
                {percentage}%
              </Typography>
              <Typography sx={{ color: theme.mutedText, fontSize: 12 }}>Score</Typography>
            </Box>
          </Stack>

          <AppButton
            variant="contained"
            startIcon={<ReplayIcon />}
            disabled={missedCount === 0}
            onClick={onPracticeMissed}
            sx={{
              backgroundColor: theme.accent,
              color: "#fff",
              whiteSpace: "nowrap",
              "&:hover": { backgroundColor: theme.accentHover },
              "&.Mui-disabled": { backgroundColor: theme.border, color: theme.mutedText },
            }}
          >
            Practice missed
          </AppButton>
        </Stack>
      </Stack>
    </Paper>
  );
}
