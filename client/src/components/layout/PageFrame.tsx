import type { ReactNode } from "react";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { useAppTheme } from "../../styles/ThemeModeProvider";

type PageFrameSpacing = number | string | Record<string, number | string>;

type PageFrameProps = {
  children: ReactNode;
  maxWidth?: number | string;
  px?: PageFrameSpacing;
  py?: PageFrameSpacing;
  centerContent?: boolean;
  sx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
};

export default function PageFrame({
  children,
  maxWidth,
  px = 2,
  py = 6,
  centerContent = false,
  sx,
  contentSx,
}: PageFrameProps) {
  const { theme } = useAppTheme();

  return (
    <Box
      sx={[
        {
          width: "100%",
          minHeight: "100vh",
          backgroundColor: theme.background,
          px,
          py,
          display: "flex",
          justifyContent: "center",
          alignItems: centerContent ? "center" : undefined,
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Box
        sx={[
          {
            width: "100%",
            maxWidth,
          },
          ...(Array.isArray(contentSx) ? contentSx : contentSx ? [contentSx] : []),
        ]}
      >
        {children}
      </Box>
    </Box>
  );
}
