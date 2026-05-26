import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import { useAppTheme } from "../styles/ThemeModeProvider";

export default function AppLayout() {
  const { theme } = useAppTheme();

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: theme.background }}>
      <AppNav />
      <Outlet />
    </Box>
  );
}
