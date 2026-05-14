import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material/styles";

const baseButtonSx: SxProps<Theme> = {
  textTransform: "none",
  borderRadius: 2,
  fontWeight: 600,
};

const mergeSx = (sx?: SxProps<Theme>): SxProps<Theme> => {
  const sxValues = Array.isArray(sx) ? sx : [sx];

  return [baseButtonSx, ...sxValues].filter(Boolean) as SxProps<Theme>;
};

export default function AppButton({ sx, ...props }: ButtonProps) {
  return <Button {...props} sx={mergeSx(sx)} />;
}
