import { Box, Paper, Stack, Typography } from "@mui/material";
import { useAppTheme } from "../../styles/ThemeModeProvider";

type ResultSummaryHeaderProps = {
  percentage: number;
};

export default function ResultSummaryHeader({ percentage }: ResultSummaryHeaderProps) {
  const { theme } = useAppTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: theme.elevated,
        border: `1px solid ${theme.borderStrong}`,
        borderRadius: 4,
        p: 4,
        mb: 4,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box>
          <Typography
            variant="overline"
            sx={{
              color: theme.mutedText,
              letterSpacing: 1.5,
            }}
          >
            TEST RESULTS
          </Typography>

          <Typography
            variant="h3"
            sx={{
              color: theme.text,
              fontWeight: 700,
              mt: 1,
            }}
          >
            {percentage}% Score
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: theme.mutedText,
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
            background: `linear-gradient(135deg, ${theme.accent} 0%, #7c3aed 100%)`,
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
  );
}
