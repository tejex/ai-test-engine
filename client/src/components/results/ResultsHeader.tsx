import { Box, Stack, Typography } from "@mui/material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import AppButton from "../AppButton";
import { useAppTheme } from "../../styles/ThemeModeProvider";

type ResultsHeaderProps = {
  hasAttempts: boolean;
  isClearing: boolean;
  onClearAll: () => void;
};

export default function ResultsHeader({
  hasAttempts,
  isClearing,
  onClearAll,
}: ResultsHeaderProps) {
  const { theme } = useAppTheme();

  return (
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
          sx={{ color: theme.mutedText, fontWeight: 700, letterSpacing: 1.4 }}
        >
          RESULTS
        </Typography>
        <Typography
          variant="h4"
          sx={{ color: theme.text, fontWeight: 700, mt: 0.5 }}
        >
          Previous exams
        </Typography>
      </Box>

      {hasAttempts && (
        <AppButton
          variant="outlined"
          startIcon={<DeleteSweepIcon />}
          disabled={isClearing}
          onClick={onClearAll}
          sx={{
            borderColor: "rgba(248, 113, 113, 0.45)",
            color: theme.danger,
            "&:hover": {
              borderColor: theme.danger,
              backgroundColor: theme.dangerSoft,
            },
          }}
        >
          Clear all
        </AppButton>
      )}
    </Stack>
  );
}
