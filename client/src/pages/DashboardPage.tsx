import { Box, CircularProgress, Divider, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import InsightsIcon from "@mui/icons-material/Insights";
import PsychologyIcon from "@mui/icons-material/Psychology";
import QuizIcon from "@mui/icons-material/Quiz";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useNavigate } from "react-router-dom";
import AppButton from "../components/AppButton";
import PageFrame from "../components/layout/PageFrame";
import { useRecentAttempts } from "../hooks/useRecentAttempts";
import { useAppTheme } from "../styles/ThemeModeProvider";
import { getDashboardMetrics } from "./dashboardMetrics";

type StatCardProps = {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  helper?: string;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(value));

function StatCard({ label, value, icon, helper }: StatCardProps) {
  const { theme } = useAppTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: theme.surface,
        border: `1px solid ${theme.borderStrong}`,
        borderRadius: 2,
        p: 2,
        minHeight: 122,
      }}
    >
      <Stack spacing={1.5}>
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: 2,
            backgroundColor: theme.accentSoft,
            color: theme.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
        <Typography sx={{ color: theme.text, fontSize: 30, fontWeight: 800, lineHeight: 1 }}>
          {value}
        </Typography>
        <Box>
          <Typography sx={{ color: theme.subtleText, fontWeight: 700, fontSize: 13 }}>
            {label}
          </Typography>
          {helper && (
            <Typography sx={{ color: theme.mutedText, fontSize: 12, mt: 0.25 }}>
              {helper}
            </Typography>
          )}
        </Box>
      </Stack>
    </Paper>
  );
}

function RingMetric({ value }: { value: number }) {
  const { theme } = useAppTheme();
  const display = Math.round(value * 100);

  return (
    <Box
      sx={{
        width: 188,
        height: 188,
        borderRadius: "50%",
        background: `conic-gradient(${theme.accent} ${display * 3.6}deg, ${theme.panel} 0deg)`,
        display: "grid",
        placeItems: "center",
        mx: "auto",
      }}
    >
      <Box
        sx={{
          width: 136,
          height: 136,
          borderRadius: "50%",
          backgroundColor: theme.background,
          display: "grid",
          placeItems: "center",
          border: `1px solid ${theme.border}`,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ color: theme.text, fontSize: 38, fontWeight: 900, lineHeight: 1 }}>
            {display}%
          </Typography>
          <Typography sx={{ color: theme.mutedText, fontSize: 12, mt: 0.75 }}>
            Recall
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { theme } = useAppTheme();
  const { attempts, isLoading } = useRecentAttempts();
  const metrics = getDashboardMetrics(attempts);
  const calendarDays = Array.from({ length: 21 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (20 - index));
    return date;
  });

  if (isLoading) {
    return (
      <PageFrame centerContent>
        <CircularProgress sx={{ color: theme.accent }} />
      </PageFrame>
    );
  }

  return (
    <PageFrame maxWidth={1180} py={4}>
      <Stack spacing={3}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{ justifyContent: "space-between", gap: 2, alignItems: { md: "center" } }}
        >
          <Box>
            <Typography sx={{ color: theme.text, fontSize: 30, fontWeight: 900 }}>
              Dashboard
            </Typography>
            <Typography sx={{ color: theme.mutedText, mt: 0.75 }}>
              Track active recall progress and choose your next practice.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.25}>
            <AppButton
              variant="outlined"
              startIcon={<FlashOnIcon />}
              onClick={() => navigate("/results")}
              sx={{ borderColor: theme.borderStrong, color: theme.text }}
            >
              Review results
            </AppButton>
            <AppButton
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => navigate("/upload")}
              sx={{
                backgroundColor: theme.accent,
                color: "#fff",
                "&:hover": { backgroundColor: theme.accentHover },
              }}
            >
              New test
            </AppButton>
          </Stack>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(6, 1fr)" },
            gap: 1.5,
          }}
        >
          <StatCard label="Active days" value={metrics.activeDaysThisMonth} icon={<CalendarMonthIcon />} helper="this month" />
          <StatCard label="Current streak" value={metrics.currentStreak} icon={<TrendingUpIcon />} helper="days in a row" />
          <StatCard label="Tests" value={metrics.testsCompleted} icon={<QuizIcon />} helper="completed" />
          <StatCard label="Questions" value={metrics.questionsAnswered} icon={<PsychologyIcon />} helper="answered" />
          <StatCard label="Avg score" value={metrics.averageScoreText} icon={<InsightsIcon />} helper="recent attempts" />
          <StatCard label="Missed" value={metrics.missedQuestions} icon={<CheckCircleOutlineIcon />} helper="to review" />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.4fr 0.85fr" },
            gap: 2,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              backgroundColor: theme.surface,
              border: `1px solid ${theme.borderStrong}`,
              borderRadius: 2,
              p: 3,
            }}
          >
            <Stack spacing={3}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                sx={{ justifyContent: "space-between", gap: 2, alignItems: { md: "center" } }}
              >
                <Box>
                  <Typography sx={{ color: theme.text, fontSize: 20, fontWeight: 800 }}>
                    Recommended next practice
                  </Typography>
                  <Typography sx={{ color: theme.mutedText, mt: 0.75 }}>
                    {metrics.missedQuestions > 0
                      ? `${metrics.missedQuestions} missed questions are ready for active recall.`
                      : "No missed questions yet. Generate a test to start building recall history."}
                  </Typography>
                </Box>

                <AppButton
                  variant="contained"
                  startIcon={<FlashOnIcon />}
                  onClick={() => navigate(metrics.missedQuestions > 0 ? "/practice/missed" : "/upload")}
                  sx={{
                    backgroundColor: theme.accent,
                    color: "#fff",
                    "&:hover": { backgroundColor: theme.accentHover },
                  }}
                >
                  {metrics.missedQuestions > 0 ? "Practice missed" : "Create test"}
                </AppButton>
              </Stack>

              <Divider sx={{ borderColor: theme.border }} />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: 2,
                }}
              >
                <Box>
                  <Typography sx={{ color: theme.text, fontWeight: 800, mb: 1.5 }}>
                    Score trend
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ alignItems: "end", height: 118 }}>
                    {(metrics.scoreTrend.length ? metrics.scoreTrend : [0, 0, 0, 0, 0, 0]).map((score, index) => (
                      <Box
                        key={`${score}-${index}`}
                        sx={{
                          flex: 1,
                          height: `${Math.max(score, 8)}%`,
                          minHeight: 10,
                          borderRadius: 1,
                          backgroundColor: score ? theme.accent : theme.panel,
                          opacity: score ? 0.7 + index / 20 : 1,
                        }}
                      />
                    ))}
                  </Stack>
                </Box>

                <Box>
                  <Typography sx={{ color: theme.text, fontWeight: 800, mb: 1.5 }}>
                    Active recall calendar
                  </Typography>
                  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1 }}>
                    {calendarDays.map((day) => {
                      const active = metrics.activeDays.has(day.toISOString().slice(0, 10));
                      return (
                        <Box
                          key={day.toISOString()}
                          title={formatDate(day.toISOString())}
                          sx={{
                            aspectRatio: "1",
                            borderRadius: 1,
                            backgroundColor: active ? theme.accent : theme.panel,
                            border: `1px solid ${active ? theme.accent : theme.border}`,
                          }}
                        />
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              backgroundColor: theme.surface,
              border: `1px solid ${theme.borderStrong}`,
              borderRadius: 2,
              p: 3,
            }}
          >
            <Typography sx={{ color: theme.text, fontSize: 20, fontWeight: 800, mb: 3 }}>
              Overall recall strength
            </Typography>
            <RingMetric value={metrics.averageScore} />
            <Typography sx={{ color: theme.mutedText, textAlign: "center", mt: 3 }}>
              Best recent score: {metrics.bestScoreText}
            </Typography>
          </Paper>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: 2,
          }}
        >
          <Paper elevation={0} sx={{ backgroundColor: theme.surface, border: `1px solid ${theme.borderStrong}`, borderRadius: 2, p: 3 }}>
            <Typography sx={{ color: theme.text, fontSize: 20, fontWeight: 800, mb: 2 }}>
              Weak areas
            </Typography>
            <Stack spacing={2}>
              {[...metrics.accuracyByType, ...metrics.accuracyByDifficulty].slice(0, 6).map((item) => (
                <Box key={`${item.label}-${item.total}`}>
                  <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.75 }}>
                    <Typography sx={{ color: theme.text, fontWeight: 700 }}>{item.label}</Typography>
                    <Typography sx={{ color: theme.mutedText }}>{Math.round(item.value * 100)}%</Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={Math.round(item.value * 100)}
                    sx={{
                      height: 8,
                      borderRadius: 99,
                      backgroundColor: theme.panel,
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: item.value < 0.6 ? theme.danger : theme.accent,
                        borderRadius: 99,
                      },
                    }}
                  />
                </Box>
              ))}
              {!metrics.accuracyByType.length && (
                <Typography sx={{ color: theme.mutedText }}>
                  Complete a test to reveal weak question types and difficulty levels.
                </Typography>
              )}
            </Stack>
          </Paper>

          <Paper elevation={0} sx={{ backgroundColor: theme.surface, border: `1px solid ${theme.borderStrong}`, borderRadius: 2, p: 3 }}>
            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography sx={{ color: theme.text, fontSize: 20, fontWeight: 800 }}>
                Recent tests
              </Typography>
              <AppButton
                variant="outlined"
                onClick={() => navigate("/results")}
                sx={{ borderColor: theme.borderStrong, color: theme.text }}
              >
                View all
              </AppButton>
            </Stack>
            <Stack spacing={1.5}>
              {metrics.recentAttempts.map((attempt) => (
                <Box
                  key={attempt.id}
                  onClick={() => navigate(`/results/${attempt.id}`)}
                  sx={{
                    p: 1.75,
                    borderRadius: 2,
                    border: `1px solid ${theme.border}`,
                    cursor: "pointer",
                    "&:hover": { backgroundColor: theme.accentSoft },
                  }}
                >
                  <Stack direction="row" sx={{ justifyContent: "space-between", gap: 2 }}>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ color: theme.text, fontWeight: 800, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {attempt.test?.document?.title || "Untitled exam"}
                      </Typography>
                      <Typography sx={{ color: theme.mutedText, fontSize: 12, mt: 0.5 }}>
                        {formatDate(attempt.createdAt)} · {attempt.responses?.length || 0} questions
                      </Typography>
                    </Box>
                    <Typography sx={{ color: theme.accent, fontWeight: 900 }}>
                      {Math.round(attempt.score * 100)}%
                    </Typography>
                  </Stack>
                </Box>
              ))}
              {!metrics.recentAttempts.length && (
                <Typography sx={{ color: theme.mutedText }}>
                  Your completed tests will appear here.
                </Typography>
              )}
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </PageFrame>
  );
}
