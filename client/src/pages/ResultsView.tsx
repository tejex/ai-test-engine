import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";

import {
  Box,
  Button,
  Typography,
  Paper,
  Stack,
  Chip,
  CircularProgress,
  Divider,
} from "@mui/material";

export default function ResultsView() {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);

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
          backgroundColor: "#0e1015",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#5e6ad2" }} />
      </Box>
    );
  }

  const percentage = Math.round(data.score * 100);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0e1015",
        px: 3,
        py: 6,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1100 }}>
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#161a22",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 4,
            p: 4,
            mb: 4,
          }}
        >

        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: "#8b92a8",
                  letterSpacing: 1.5,
                }}
              >
                TEST RESULTS
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  color: "#ffffff",
                  fontWeight: 700,
                  mt: 1,
                }}
              >
                {percentage}% Score
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#9ca3af",
                  mt: 1,
                }}
              >
                Review your answers and AI-generated feedback.
              </Typography>
            </Box>

            <Box
              sx={{
                width: 110,
                height: 110,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #5e6ad2 0%, #7c3aed 100%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 0 30px rgba(94,106,210,0.3)",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                {percentage}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Responses */}
        <Button
          variant="outlined"
          onClick={() => navigate("/results")}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            borderColor: "rgba(232, 233, 237, 0.25)",
            color: "#e8e9ed",
            mb: 3,
            "&:hover": {
              borderColor: "#5e6ad2",
              backgroundColor: "rgba(94, 106, 210, 0.08)",
            },
          }}
        >
          All results
        </Button>

        <Stack spacing={3}>
          {data.responses.map((r: any, index: number) => (
            <Paper
              key={r.id}
              elevation={0}
              sx={{
                backgroundColor: "#161a22",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 4,
                p: 4,
              }}
            >
                <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', flex: 1, alignItems: 'center', mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#ffffff",
                    fontWeight: 600,
                  }}
                >
                  Question {index + 1}
                </Typography>

                <Chip
                  label={r.isCorrect ? "Correct" : "Incorrect"}
                  sx={{
                    backgroundColor: r.isCorrect
                      ? "rgba(34,197,94,0.15)"
                      : "rgba(239,68,68,0.15)",
                    color: r.isCorrect ? "#4ade80" : "#f87171",
                    fontWeight: 600,
                  }}
                />
              </Stack>

              <Typography
                variant="h5"
                sx={{
                  color: "#ffffff",
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                {r.question.question}
              </Typography>

              <Divider
                sx={{
                  borderColor: "rgba(255,255,255,0.08)",
                  mb: 3,
                }}
              />

              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#8b92a8",
                      mb: 1,
                    }}
                  >
                    YOUR ANSWER
                  </Typography>

                  <Typography
                    sx={{
                      color: "#ffffff",
                      lineHeight: 1.7,
                    }}
                  >
                    {r.userAnswer || "No answer provided"}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#8b92a8",
                      mb: 1,
                    }}
                  >
                    CORRECT ANSWER
                  </Typography>

                  <Typography
                    sx={{
                      color: "#a5b4fc",
                      lineHeight: 1.7,
                      fontWeight: 500,
                    }}
                  >
                    {r.question.correctAnswer}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#8b92a8",
                      mb: 1,
                    }}
                  >
                    AI FEEDBACK
                  </Typography>

                  <Typography
                    sx={{
                      color: "#d1d5db",
                      lineHeight: 1.8,
                    }}
                  >
                    {r.feedback}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#8b92a8",
                      mb: 1,
                    }}
                  >
                    EXPLANATION
                  </Typography>

                  <Typography
                    sx={{
                      color: "#d1d5db",
                      lineHeight: 1.8,
                    }}
                  >
                    {r.question.explanation}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
