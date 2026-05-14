import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import AppButton from "../AppButton";
import type { RecentAttempt } from "../types/results";
import { useAppTheme } from "../../styles/ThemeModeProvider";

export type DeleteConfirmation =
  | { type: "single"; attempt: RecentAttempt }
  | { type: "all" }
  | null;

type DeleteResultsDialogProps = {
  confirmation: DeleteConfirmation;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteResultsDialog({
  confirmation,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteResultsDialogProps) {
  const { theme } = useAppTheme();
  const confirmationTitle =
    confirmation?.type === "all" ? "Clear all previous exams?" : "Delete this exam?";

  const confirmationBody =
    confirmation?.type === "all"
      ? "This will remove every previous exam attempt and its saved responses from the database."
      : `This will remove "${
          confirmation?.attempt.test?.document?.title || "Untitled exam"
        }" and its saved responses from the database.`;

  return (
    <Dialog
      open={Boolean(confirmation)}
      onClose={() => {
        if (!isDeleting) {
          onClose();
        }
      }}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: theme.surface,
            borderRadius: 2,
            border: `1px solid ${theme.borderStrong}`,
            width: "100%",
            maxWidth: 420,
          },
        },
      }}
    >
      <DialogTitle sx={{ color: theme.text, fontWeight: 800, pb: 1 }}>
        {confirmationTitle}
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: theme.mutedText, lineHeight: 1.6 }}>
          {confirmationBody}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <AppButton
          disabled={isDeleting}
          onClick={onClose}
          sx={{
            color: theme.accent,
            fontWeight: 700,
          }}
        >
          Cancel
        </AppButton>
        <AppButton
          variant="contained"
          disabled={isDeleting}
          onClick={onConfirm}
          sx={{
            backgroundColor: "#dc2626",
            color: "#ffffff",
            fontWeight: 700,
            "&:hover": {
                backgroundColor: "#b91c1c",
            },
          }}
        >
          {confirmation?.type === "all" ? "Clear all" : "Delete"}
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}
