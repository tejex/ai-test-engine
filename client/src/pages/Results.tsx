import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DescriptionIcon from "@mui/icons-material/Description";
import { api } from "../api/client";

type RecentAttempt = {
  id: string;
  score: number;
  createdAt: string;
  test?: {
    id: string;
    createdAt?: string;
    document?: {
      title?: string;
    };
  };
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

const scoreTone = (score: number) => {
  if (score >= 0.8) return { bg: "#5e6ad2", color: "#ffffff", label: "Strong" };
  if (score >= 0.6) return { bg: "rgba(94, 106, 210, 0.14)", color: "#5e6ad2", label: "Steady" };
  return { bg: "rgba(245, 158, 11, 0.16)", color: "#b45309", label: "Review" };
};

export default function Results() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [attempts, setAttempts] = useState<RecentAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const latestAttemptId = searchParams.get("latest");

  useEffect(() => {
    api
      .get("/attempts/recent")
      .then((res) => setAttempts(res.data || []))
      .catch((err) => console.error("Failed to load recent attempts", err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#0e1015",
        py: 6,
        px: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 900 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{ color: "#8b92a8", fontWeight: 700, letterSpacing: 1.4 }}
            >
              RESULTS
            </Typography>
            <Typography
              variant="h4"
              sx={{ color: "#ffffff", fontWeight: 700, mt: 0.5 }}
            >
              Previous exams
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              borderColor: "rgba(232, 233, 237, 0.25)",
              color: "#e8e9ed",
              "&:hover": {
                borderColor: "#5e6ad2",
                backgroundColor: "rgba(94, 106, 210, 0.08)",
              },
            }}
          >
            Home
          </Button>
        </Stack>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress sx={{ color: "#5e6ad2" }} />
          </Box>
        ) : attempts.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "#e8e9ed",
              borderRadius: 2,
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ color: "#0e1015", fontWeight: 700 }}>
              No previous exams yet
            </Typography>
            <Typography sx={{ color: "rgba(14, 16, 21, 0.65)", mt: 1 }}>
              Completed tests will show up here after you submit them.
            </Typography>
          </Paper>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
              },
              gap: 2,
            }}
          >
            {attempts.map((attempt) => {
              const percentage = Math.round(attempt.score * 100);
              const tone = scoreTone(attempt.score);
              const title = attempt.test?.document?.title || "Untitled exam";
              const isLatest = attempt.id === latestAttemptId;

              return (
                <Paper
                  key={attempt.id}
                  elevation={0}
                  onClick={() => navigate(`/results/${attempt.id}`)}
                  sx={{
                    backgroundColor: "#e8e9ed",
                    borderRadius: 2,
                    p: 2,
                    minHeight: 168,
                    cursor: "pointer",
                    border: isLatest
                      ? "2px solid #5e6ad2"
                      : "1px solid rgba(255, 255, 255, 0.08)",
                    transition: "transform 160ms ease, box-shadow 160ms ease",
                    boxShadow: isLatest ? "0 0 0 4px rgba(94, 106, 210, 0.18)" : "none",
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
                          backgroundColor: "rgba(94, 106, 210, 0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <DescriptionIcon sx={{ color: "#5e6ad2", fontSize: 20 }} />
                      </Box>
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
                    </Stack>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: "#0e1015",
                          fontWeight: 700,
                          lineHeight: 1.25,
                          mb: 0.75,
                        }}
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "rgba(14, 16, 21, 0.62)", fontWeight: 500 }}
                      >
                        Completed {formatDate(attempt.createdAt)}
                      </Typography>
                    </Box>

                    <Stack
                      direction="row"
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        pt: 1,
                        borderTop: "1px solid rgba(14, 16, 21, 0.1)",
                      }}
                    >
                      <Typography sx={{ color: "#5e6ad2", fontWeight: 800 }}>
                        {percentage}%
                      </Typography>
                      <ArrowForwardIcon sx={{ color: "rgba(14, 16, 21, 0.5)", fontSize: 20 }} />
                    </Stack>
                  </Stack>
                </Paper>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}
