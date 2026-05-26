import { Box, Chip, Divider, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FlipIcon from "@mui/icons-material/Flip";
import ReplayIcon from "@mui/icons-material/Replay";
import AppButton from "../AppButton";
import { useAppTheme } from "../../styles/ThemeModeProvider";
import { titleCase } from "./missedQuestionUtils";
import type { MissedQuestionCard } from "./types";

type MissedQuestionStudyPanelProps = {
  cards: MissedQuestionCard[];
  currentIndex: number;
  progressValue: number;
  onFlip: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onRestart: () => void;
  onJumpToCard: (index: number) => void;
};

export default function MissedQuestionStudyPanel({
  cards,
  currentIndex,
  progressValue,
  onFlip,
  onPrevious,
  onNext,
  onRestart,
  onJumpToCard,
}: MissedQuestionStudyPanelProps) {
  const { theme } = useAppTheme();
  const currentCard = cards[currentIndex];
  const isFirstCard = currentIndex === 0;
  const isLastCard = currentIndex === cards.length - 1;

  if (!currentCard) {
    return null;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: theme.surface,
        border: `1px solid ${theme.borderStrong}`,
        borderRadius: 2,
        p: 2.5,
        position: { lg: "sticky" },
        top: { lg: 92 },
      }}
    >
      <Stack spacing={2.25}>
        <Box>
          <Typography sx={{ color: theme.text, fontSize: 18, fontWeight: 900 }}>
            Study deck
          </Typography>
          <Typography sx={{ color: theme.mutedText, fontSize: 13, mt: 0.5 }}>
            {currentCard.attempt.test?.document?.title || "Untitled exam"}
          </Typography>
        </Box>

        <Box>
          <Stack direction="row" sx={{ justifyContent: "space-between", mb: 1 }}>
            <Typography sx={{ color: theme.mutedText, fontSize: 13, fontWeight: 700 }}>
              Progress
            </Typography>
            <Typography sx={{ color: theme.text, fontSize: 13, fontWeight: 900 }}>
              {currentIndex + 1}/{cards.length}
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={progressValue}
            sx={{
              height: 8,
              borderRadius: 99,
              backgroundColor: theme.panel,
              "& .MuiLinearProgress-bar": {
                borderRadius: 99,
                backgroundColor: theme.accent,
              },
            }}
          />
        </Box>

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          <Chip
            label={titleCase(currentCard.response.question.type)}
            sx={{ backgroundColor: theme.accentSoft, color: theme.accent, fontWeight: 800 }}
          />
          <Chip
            label={titleCase(currentCard.response.question.difficulty)}
            sx={{ backgroundColor: theme.panel, color: theme.mutedText, fontWeight: 700 }}
          />
        </Stack>

        <Divider sx={{ borderColor: theme.border }} />

        <Box>
          <Typography sx={{ color: theme.text, fontWeight: 900, mb: 1.25 }}>
            Jump to card
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 0.75 }}>
            {cards.map((card, index) => (
              <Box
                key={`${card.response.id}-${index}`}
                onClick={() => onJumpToCard(index)}
                sx={{
                  height: 34,
                  borderRadius: 1.25,
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 900,
                  color: index === currentIndex ? "#fff" : theme.text,
                  backgroundColor: index === currentIndex ? theme.accent : theme.panel,
                  border: `1px solid ${index === currentIndex ? theme.accent : theme.border}`,
                  "&:hover": {
                    borderColor: theme.accent,
                  },
                }}
              >
                {index + 1}
              </Box>
            ))}
          </Box>
        </Box>

        <Divider sx={{ borderColor: theme.border }} />

        <Stack spacing={1.25}>
          <AppButton
            fullWidth
            variant="outlined"
            startIcon={<FlipIcon />}
            onClick={onFlip}
            sx={{ borderColor: theme.accent, color: theme.accent }}
          >
            Flip card
          </AppButton>
          <Stack direction="row" spacing={1}>
            <AppButton
              fullWidth
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              disabled={isFirstCard}
              onClick={onPrevious}
              sx={{
                borderColor: theme.borderStrong,
                color: theme.text,
                "&.Mui-disabled": { borderColor: theme.border, color: theme.mutedText },
              }}
            >
              Prev
            </AppButton>
            <AppButton
              fullWidth
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              disabled={isLastCard}
              onClick={onNext}
              sx={{
                backgroundColor: theme.accent,
                color: "#fff",
                "&:hover": { backgroundColor: theme.accentHover },
                "&.Mui-disabled": { backgroundColor: theme.border, color: theme.mutedText },
              }}
            >
              Next
            </AppButton>
          </Stack>
          <AppButton
            fullWidth
            variant="outlined"
            startIcon={<ReplayIcon />}
            onClick={onRestart}
            sx={{ borderColor: theme.borderStrong, color: theme.text }}
          >
            Restart deck
          </AppButton>
        </Stack>
      </Stack>
    </Paper>
  );
}
