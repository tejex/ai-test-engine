import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { appThemes } from "./theme";
import type { AppTheme, AppThemeMode } from "./theme";

type ThemeModeContextValue = {
  mode: AppThemeMode;
  theme: AppTheme;
  toggleTheme: () => void;
};

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppThemeMode>("dark");

  const value = useMemo(
    () => ({
      mode,
      theme: appThemes[mode],
      toggleTheme: () => setMode((current) => (current === "dark" ? "light" : "dark")),
    }),
    [mode],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error("useAppTheme must be used inside ThemeModeProvider");
  }

  return context;
}
