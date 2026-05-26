import { useMemo, useState } from "react";
import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppButton from "../components/AppButton";
import PageFrame from "../components/layout/PageFrame";
import MissedQuestionFlashcard from "../components/practice/MissedQuestionFlashcard";
import MissedQuestionStudyPanel from "../components/practice/MissedQuestionStudyPanel";
import { getMissedQuestionCards } from "../components/practice/missedQuestionUtils";
import { useRecentAttempts } from "../hooks/useRecentAttempts";
import { useAppTheme } from "../styles/ThemeModeProvider";

export default function MissedPracticePage() {
  const navigate = useNavigate();
  const { theme } = useAppTheme();
  const { attempts, isLoading } = useRecentAttempts();
  const missedCards = useMemo(() => getMissedQuestionCards(attempts), [attempts]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const currentCard = missedCards[currentIndex];
  const progressValue = ((currentIndex + 1) / missedCards.length) * 100;

  const goToCard = (nextIndex: number) => {
    setCurrentIndex(Math.min(Math.max(nextIndex, 0), missedCards.length - 1));
    setIsFlipped(false);
  };

  const flipCard = () => setIsFlipped((current) => !current);

  if (isLoading) {
    return (
      <PageFrame centerContent>
        <CircularProgress sx={{ color: theme.accent }} />
      </PageFrame>
    );
  }

  if (!currentCard) {
    return (
      <PageFrame maxWidth={760} centerContent>
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
          <Typography sx={{ color: theme.text, fontSize: 28, fontWeight: 900 }}>
            No missed questions yet
          </Typography>
          <Typography sx={{ color: theme.mutedText, mt: 1.5, mb: 3 }}>
            Complete a test and any incorrect answers will appear here for focused review.
          </Typography>
          <Stack direction="row" spacing={1.5} sx={{ justifyContent: "center" }}>
            <AppButton
              variant="outlined"
              onClick={() => navigate("/")}
              sx={{ borderColor: theme.borderStrong, color: theme.text }}
            >
              Dashboard
            </AppButton>
            <AppButton
              variant="contained"
              onClick={() => navigate("/upload")}
              sx={{
                backgroundColor: theme.accent,
                color: "#fff",
                "&:hover": { backgroundColor: theme.accentHover },
              }}
            >
              Create test
            </AppButton>
          </Stack>
        </Paper>
      </PageFrame>
    );
  }

  return (
    <PageFrame maxWidth={1280} py={4}>
      <Stack spacing={2.5}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{ justifyContent: "space-between", alignItems: { md: "center" }, gap: 2 }}
        >
          <Box>
            <Typography sx={{ color: theme.text, fontSize: 30, fontWeight: 900 }}>
              Missed-question practice
            </Typography>
            <Typography sx={{ color: theme.mutedText, mt: 0.75 }}>
              Flip through incorrect answers and review the feedback without changing mastery stats.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.25}>
            <AppButton
              variant="outlined"
              onClick={() => navigate("/")}
              sx={{ borderColor: theme.borderStrong, color: theme.text }}
            >
              Dashboard
            </AppButton>
            <AppButton
              variant="outlined"
              onClick={() => navigate("/results")}
              sx={{ borderColor: theme.borderStrong, color: theme.text }}
            >
              Results
            </AppButton>
          </Stack>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 760px) 420px" },
            gap: 2.5,
            alignItems: "start",
            justifyContent: "center",
          }}
        >
          <MissedQuestionFlashcard
            card={currentCard}
            currentIndex={currentIndex}
            totalCards={missedCards.length}
            isFlipped={isFlipped}
            onFlip={flipCard}
          />
          <MissedQuestionStudyPanel
            cards={missedCards}
            currentIndex={currentIndex}
            progressValue={progressValue}
            onFlip={flipCard}
            onPrevious={() => goToCard(currentIndex - 1)}
            onNext={() => goToCard(currentIndex + 1)}
            onRestart={() => goToCard(0)}
            onJumpToCard={goToCard}
          />
        </Box>
      </Stack>
    </PageFrame>
  );
}
