import { Box, Stack, Typography } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useLocation, useNavigate } from "react-router-dom";
import AppButton from "./AppButton";
import { useAppTheme } from "../styles/ThemeModeProvider";

const navItems = [
  {
    label: "Home",
    path: "/",
    icon: <HomeIcon />,
    isActive: (pathname: string) => pathname === "/" || pathname.startsWith("/tests"),
  },
  {
    label: "Results",
    path: "/results",
    icon: <AssessmentIcon />,
    isActive: (pathname: string) => pathname.startsWith("/results"),
  },
];

export default function AppNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, theme, toggleTheme } = useAppTheme();
  const nextModeLabel = mode === "dark" ? "Light mode" : "Dark mode";

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        width: "100%",
        backgroundColor: theme.nav,
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${theme.navBorder}`,
      }}
    >
      <Stack
        direction="row"
        sx={{
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, sm: 3 },
          py: 1.5,
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: theme.text,
            fontWeight: 800,
            letterSpacing: 0,
            whiteSpace: "nowrap",
          }}
        >
          TestFlow AI
        </Typography>

        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          {navItems.map((item) => {
            const active = item.isActive(location.pathname);

            return (
              <AppButton
                key={item.path}
                variant={active ? "contained" : "outlined"}
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
                sx={{
                  minWidth: 108,
                  borderColor: active ? theme.accent : theme.border,
                  backgroundColor: active ? theme.accent : "transparent",
                  color: theme.text,
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: theme.accent,
                    backgroundColor: active ? theme.accentHover : theme.accentSoft,
                    boxShadow: "none",
                  },
                }}
              >
                {item.label}
              </AppButton>
            );
          })}
          <AppButton
            variant="outlined"
            startIcon={mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            onClick={toggleTheme}
            sx={{
              minWidth: 132,
              borderColor: theme.border,
              color: theme.text,
              "&:hover": {
                borderColor: theme.accent,
                backgroundColor: theme.accentSoft,
              },
            }}
          >
            {nextModeLabel}
          </AppButton>
        </Stack>
      </Stack>
    </Box>
  );
}
