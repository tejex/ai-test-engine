import type { ReactNode } from "react";
import { Box, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import FlipIcon from "@mui/icons-material/Flip";
import { useAppTheme } from "../../styles/ThemeModeProvider";
import { formatAnswer } from "./missedQuestionUtils";
import type { MissedQuestionCard } from "./types";

type FlashcardFaceProps = {
  side: "front" | "back";
  isFlipped?: boolean;
  children: ReactNode;
};

function FlashcardFace({ side, isFlipped = false, children }: FlashcardFaceProps) {
  const { theme } = useAppTheme();

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        backfaceVisibility: "hidden",
        transform: side === "back" ? "rotateY(180deg)" : "none",
        background:
          side === "front"
            ? `linear-gradient(145deg, ${theme.panel}, ${theme.surface})`
            : `linear-gradient(145deg, ${theme.elevated}, ${theme.panel})`,
        border: `1px solid ${isFlipped ? theme.accent : theme.borderStrong}`,
        borderRadius: 3,
        p: { xs: 2.5, md: 4 },
        boxShadow: side === "front" ? "0 24px 70px rgba(0,0,0,0.32)" : "0 24px 70px rgba(0,0,0,0.42)",
        overflowY: "auto",
      }}
    >
      {children}
    </Box>
  );
}

type MissedQuestionFlashcardProps = {
  card: MissedQuestionCard;
  currentIndex: number;
  totalCards: number;
  isFlipped: boolean;
  onFlip: () => void;
};

export default function MissedQuestionFlashcard({
  card,
  currentIndex,
  totalCards,
  isFlipped,
  onFlip,
}: MissedQuestionFlashcardProps) {
  const { theme } = useAppTheme();

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
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          justifyContent: "space-between",
          alignItems: { sm: "center" },
          gap: 1.5,
          p: 2,
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap" }}>
          <Chip
            label={`${currentIndex + 1} of ${totalCards}`}
            sx={{ backgroundColor: theme.accentSoft, color: theme.accent, fontWeight: 800 }}
          />
          <Chip
            label={isFlipped ? "Answer side" : "Question side"}
            sx={{ backgroundColor: theme.panel, color: theme.text, fontWeight: 700 }}
          />
        </Stack>

        <Typography sx={{ color: theme.mutedText, fontSize: 13 }}>
          Click the card to flip
        </Typography>
      </Stack>

      <Box sx={{ p: { xs: 2.5, md: 3 } }}>
        <Box
          onClick={onFlip}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onFlip();
            }
          }}
          sx={{
            height: { xs: 430, md: 430 },
            perspective: "1400px",
            cursor: "pointer",
            outline: "none",
            "&:focus-visible > .flashcard-inner": {
              boxShadow: `0 0 0 3px ${theme.accentSoft}`,
              borderRadius: 3,
            },
          }}
        >
          <Box
            className="flashcard-inner"
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              transition: "transform 560ms cubic-bezier(0.2, 0.75, 0.25, 1)",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <FlashcardFace side="front">
              <Stack spacing={3} sx={{ height: "100%" }}>
                <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                  <Chip
                    label="Question side"
                    sx={{
                      backgroundColor: theme.accentSoft,
                      color: theme.accent,
                      fontWeight: 800,
                    }}
                  />
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center", color: theme.mutedText }}>
                    <FlipIcon sx={{ fontSize: 18 }} />
                    <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                      Click card to reveal answer
                    </Typography>
                  </Stack>
                </Stack>

                <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{
                      color: theme.text,
                      fontSize: { xs: 15, md: 20 },
                      fontWeight: 900,
                      lineHeight: 1.28,
                    }}
                  >
                    {card.response.question.question}
                  </Typography>
                </Box>

                <Divider sx={{ borderColor: theme.border }} />
                <Box>
                  <Typography sx={{ color: theme.danger, fontWeight: 800, mb: 1 }}>
                    Your previous answer
                  </Typography>
                  <Typography
                    component="pre"
                    sx={{
                      color: theme.subtleText,
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.7,
                      m: 0,
                    }}
                  >
                    {formatAnswer(card.response.userAnswer)}
                  </Typography>
                </Box>
              </Stack>
            </FlashcardFace>

            <FlashcardFace side="back" isFlipped>
              <Stack spacing={2.5}>
                <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                  <Chip
                    label="Answer side"
                    sx={{
                      backgroundColor: theme.accentSoft,
                      color: theme.accent,
                      fontWeight: 800,
                    }}
                  />
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center", color: theme.mutedText }}>
                    <FlipIcon sx={{ fontSize: 18 }} />
                    <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                      Click card to return to question
                    </Typography>
                  </Stack>
                </Stack>

                <Box>
                  <Typography sx={{ color: theme.accent, fontWeight: 900, mb: 1 }}>
                    Correct answer
                  </Typography>
                  <Typography
                    component="pre"
                    sx={{ color: theme.text, whiteSpace: "pre-wrap", lineHeight: 1.7, m: 0 }}
                  >
                    {formatAnswer(card.response.question.correctAnswer)}
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: theme.border }} />
                <Box>
                  <Typography sx={{ color: theme.text, fontWeight: 900, mb: 1 }}>
                    Feedback
                  </Typography>
                  <Typography sx={{ color: theme.subtleText, lineHeight: 1.7 }}>
                    {card.response.feedback}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: theme.text, fontWeight: 900, mb: 1 }}>
                    Explanation
                  </Typography>
                  <Typography sx={{ color: theme.subtleText, lineHeight: 1.7 }}>
                    {card.response.question.explanation}
                  </Typography>
                </Box>
              </Stack>
            </FlashcardFace>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
