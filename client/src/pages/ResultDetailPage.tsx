import { useParams } from "react-router-dom";
import { CircularProgress, Stack } from "@mui/material";
import PageFrame from "../components/layout/PageFrame";
import ResultResponseCard from "../components/results/ResultResponseCard";
import ResultSummaryHeader from "../components/results/ResultSummaryHeader";
import { useAttemptResult } from "../hooks/useAttemptResult";
import { useAppTheme } from "../styles/ThemeModeProvider";

export default function ResultDetailPage() {
  const { attemptId } = useParams();
  const { theme } = useAppTheme();
  const { result } = useAttemptResult(attemptId);

  if (!result) {
    return (
      <PageFrame centerContent>
        <CircularProgress sx={{ color: theme.accent }} />
      </PageFrame>
    );
  }

  const percentage = Math.round(result.score * 100);

  return (
    <PageFrame maxWidth={1100} px={3}>
      <ResultSummaryHeader percentage={percentage} />

      <Stack spacing={3}>
        {result.responses.map((response, index) => (
          <ResultResponseCard
            key={response.id}
            response={response}
            index={index}
          />
        ))}
      </Stack>
    </PageFrame>
  );
}
