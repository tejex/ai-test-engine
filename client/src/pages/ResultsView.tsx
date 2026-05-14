import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Stack } from "@mui/material";
import { api } from "../api/client";
import ResultResponseCard from "../components/results/ResultResponseCard";
import ResultSummaryHeader from "../components/results/ResultSummaryHeader";
import type { AttemptResult } from "../components/types/results";
import { useAppTheme } from "../styles/ThemeModeProvider";

export default function ResultsView() {
  const { attemptId } = useParams();
  const { theme } = useAppTheme();
  const [data, setData] = useState<AttemptResult | null>(null);

  useEffect(() => {
    api.get(`/results/${attemptId}`).then((res) => {
      setData(res.data);
    });
  }, [attemptId]);

  if (!data) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: theme.background,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: theme.accent }} />
      </Box>
    );
  }

  const percentage = Math.round(data.score * 100);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.background,
        px: 3,
        py: 6,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1100 }}>
        <ResultSummaryHeader percentage={percentage} />

        <Stack spacing={3}>
          {data.responses.map((response, index) => (
            <ResultResponseCard
              key={response.id}
              response={response}
              index={index}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
