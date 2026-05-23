import { CircularProgress, Stack, Typography } from "@mui/material";
import PageFrame from "./PageFrame";
import { useAppTheme } from "../../styles/ThemeModeProvider";

export default function RouteLoadingFallback() {
  const { theme } = useAppTheme();

  return (
    <PageFrame centerContent>
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <CircularProgress size={28} sx={{ color: theme.accent }} />
        <Typography
          variant="body2"
          sx={{
            color: theme.mutedText,
            fontWeight: 600,
          }}
        >
          Loading page...
        </Typography>
      </Stack>
    </PageFrame>
  );
}
