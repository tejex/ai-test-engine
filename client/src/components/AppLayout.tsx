import { Box, Drawer, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import RecentMaterialsSection from "./RecentMaterials";
import { useAppTheme } from "../styles/ThemeModeProvider";

export default function AppLayout() {
  const { theme } = useAppTheme();
  const [isRecentTestsOpen, setIsRecentTestsOpen] = useState(false);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: theme.background }}>
      <AppNav onOpenRecentTests={() => setIsRecentTestsOpen(true)} />
      <Outlet />

      <Drawer
        anchor="right"
        open={isRecentTestsOpen}
        onClose={() => setIsRecentTestsOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "92vw", sm: 520, md: 620 },
              backgroundColor: theme.background,
              borderLeft: `1px solid ${theme.borderStrong}`,
              p: 2.5,
            },
          },
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2.5,
          }}
        >
          <Box>
            <Typography sx={{ color: theme.text, fontWeight: 800, fontSize: 18 }}>
              Recent tests
            </Typography>
            <Typography sx={{ color: theme.mutedText, fontSize: 13 }}>
              Jump back into previous exam results.
            </Typography>
          </Box>

          <IconButton
            aria-label="Close recent tests panel"
            onClick={() => setIsRecentTestsOpen(false)}
            sx={{ color: theme.mutedText }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <RecentMaterialsSection
          variant="panel"
          onNavigate={() => setIsRecentTestsOpen(false)}
        />
      </Drawer>
    </Box>
  );
}
