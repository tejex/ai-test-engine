import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import PageFrame from "../components/layout/PageFrame";
import ResultQuestionList from "../components/results/ResultQuestionList";
import type { ResultFilter } from "../components/results/ResultQuestionList";
import ResultQuestionReviewPanel from "../components/results/ResultQuestionReviewPanel";
import ResultSummaryHeader from "../components/results/ResultSummaryHeader";
import { useAttemptResult } from "../hooks/useAttemptResult";
import { useAppTheme } from "../styles/ThemeModeProvider";

export default function ResultDetailPage() {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const { theme } = useAppTheme();
  const { result } = useAttemptResult(attemptId);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filter, setFilter] = useState<ResultFilter>("all");

  if (!result) {
    return (
      <PageFrame centerContent>
        <CircularProgress sx={{ color: theme.accent }} />
      </PageFrame>
    );
  }

  const percentage = Math.round(result.score * 100);
  const correctCount = result.responses.filter((response) => response.isCorrect).length;
  const missedCount = result.responses.length - correctCount;
  const title = result.test?.document?.title || "Exam results";
  const visibleItems = result.responses
    .map((response, index) => ({ response, index }))
    .filter(({ response }) => {
      if (filter === "missed") {
        return !response.isCorrect;
      }

      if (filter === "correct") {
        return response.isCorrect;
      }

      return true;
    });
  const selectedResponse = result.responses[selectedIndex] || result.responses[0];

  const handleFilterChange = (nextFilter: ResultFilter) => {
    setFilter(nextFilter);

    const firstMatchIndex = result.responses.findIndex((response) => {
      if (nextFilter === "missed") {
        return !response.isCorrect;
      }

      if (nextFilter === "correct") {
        return response.isCorrect;
      }

      return true;
    });

    if (firstMatchIndex >= 0) {
      setSelectedIndex(firstMatchIndex);
    }
  };

  return (
    <PageFrame maxWidth={1280} px={3}>
      <ResultSummaryHeader
        title={title}
        percentage={percentage}
        correctCount={correctCount}
        totalCount={result.responses.length}
        missedCount={missedCount}
        submittedAt={result.createdAt}
        onPracticeMissed={() => navigate("/practice/missed")}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "360px minmax(0, 1fr)" },
          gap: 2.5,
          alignItems: "start",
        }}
      >
        <ResultQuestionList
          responses={result.responses}
          visibleItems={visibleItems}
          selectedIndex={selectedIndex}
          filter={filter}
          onFilterChange={handleFilterChange}
          onSelect={setSelectedIndex}
        />
        {selectedResponse ? (
          <ResultQuestionReviewPanel
            response={selectedResponse}
            index={selectedIndex}
            totalCount={result.responses.length}
            onPrevious={() => setSelectedIndex((current) => Math.max(current - 1, 0))}
            onNext={() => setSelectedIndex((current) => Math.min(current + 1, result.responses.length - 1))}
          />
        ) : null}
      </Box>
    </PageFrame>
  );
}
