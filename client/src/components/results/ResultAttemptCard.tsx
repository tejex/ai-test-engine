import { Box, Chip, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import type { RecentAttempt } from "../types/results";
import { formatResultDate, getScoreTone } from "./resultUtils";
import { useAppTheme } from "../../styles/ThemeModeProvider";

type ResultAttemptCardProps = {
  attempt: RecentAttempt;
  isLatest: boolean;
  isDeleting: boolean;
  onOpen: () => void;
  onDelete: () => void;
};

export default function ResultAttemptCard({
  attempt,
  isLatest,
  isDeleting,
  onOpen,
  onDelete,
}: ResultAttemptCardProps) {
  const { theme } = useAppTheme();
  const percentage = Math.round(attempt.score * 100);
  const tone = getScoreTone(attempt.score, theme);
  const title = attempt.test?.document?.title || "Untitled exam";

  return (
    <Paper
      elevation={0}
      onClick={onOpen}
      sx={{
        backgroundColor: theme.surface,
        borderRadius: 2,
        p: 2,
        minHeight: 168,
        cursor: "pointer",
        border: isLatest ? `2px solid ${theme.accent}` : `1px solid ${theme.borderStrong}`,
        transition: "transform 160ms ease, box-shadow 160ms ease",
        boxShadow: isLatest ? `0 0 0 4px ${theme.accentSoft}` : "none",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 14px 30px rgba(0, 0, 0, 0.22)",
        },
      }}
    >
      <Stack spacing={2} sx={{ height: "100%" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", gap: 1 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              backgroundColor: theme.accentSoft,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <DescriptionIcon sx={{ color: theme.accent, fontSize: 20 }} />
          </Box>

          <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
            <Chip
              label={isLatest ? "Latest" : tone.label}
              size="small"
              sx={{
                backgroundColor: tone.bg,
                color: tone.color,
                fontWeight: 700,
                borderRadius: 1.5,
              }}
            />
            <Tooltip title="Delete exam">
              <span>
                <IconButton
                  size="small"
                  disabled={isDeleting}
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete();
                  }}
                  sx={{
                    width: 30,
                    height: 30,
                    color: theme.danger,
                    backgroundColor: theme.dangerSoft,
                    "&:hover": {
                      backgroundColor: "rgba(248, 113, 113, 0.2)",
                    },
                  }}
                >
                  <DeleteIcon sx={{ fontSize: 17 }} />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
        </Stack>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: theme.text,
              fontWeight: 700,
              lineHeight: 1.25,
              mb: 0.75,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: theme.mutedText, fontWeight: 500 }}
          >
            Completed {formatResultDate(attempt.createdAt)}
          </Typography>
        </Box>

        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            pt: 1,
            borderTop: `1px solid ${theme.border}`,
          }}
        >
          <Typography sx={{ color: theme.accent, fontWeight: 800 }}>
            {percentage}%
          </Typography>
          <ArrowForwardIcon sx={{ color: theme.mutedText, fontSize: 20 }} />
        </Stack>
      </Stack>
    </Paper>
  );
}
