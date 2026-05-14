import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";
import { api } from "../api/client";
import DeleteResultsDialog from "../components/results/DeleteResultsDialog";
import type { DeleteConfirmation } from "../components/results/DeleteResultsDialog";
import ResultsGrid from "../components/results/ResultsGrid";
import ResultsHeader from "../components/results/ResultsHeader";
import type { RecentAttempt } from "../components/types/results";
import { useAppTheme } from "../styles/ThemeModeProvider";

export default function Results() {
  const navigate = useNavigate();
  const { theme } = useAppTheme();
  const [searchParams] = useSearchParams();
  const [attempts, setAttempts] = useState<RecentAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingAttemptId, setDeletingAttemptId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<DeleteConfirmation>(null);
  const latestAttemptId = searchParams.get("latest");

  useEffect(() => {
    api
      .get("/attempts/recent")
      .then((res) => setAttempts(res.data || []))
      .catch((err) => console.error("Failed to load recent attempts", err))
      .finally(() => setIsLoading(false));
  }, []);

  const deleteAttempt = async (attempt: RecentAttempt) => {
    setDeletingAttemptId(attempt.id);

    try {
      await api.delete(`/attempts/${attempt.id}`);
      setAttempts((current) => current.filter((item) => item.id !== attempt.id));
      setDeleteConfirmation(null);
    } catch (err) {
      console.error("Failed to delete attempt", err);
    } finally {
      setDeletingAttemptId(null);
    }
  };

  const clearAttempts = async () => {
    setIsClearing(true);

    try {
      await api.delete("/attempts");
      setAttempts([]);
      setDeleteConfirmation(null);
    } catch (err) {
      console.error("Failed to clear attempts", err);
    } finally {
      setIsClearing(false);
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteConfirmation) {
      return;
    }

    if (deleteConfirmation.type === "all") {
      clearAttempts();
      return;
    }

    deleteAttempt(deleteConfirmation.attempt);
  };

  const isDeleting = Boolean(deletingAttemptId) || isClearing;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: theme.background,
        py: 6,
        px: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 900 }}>
        <ResultsHeader
          hasAttempts={attempts.length > 0}
          isClearing={isClearing}
          onClearAll={() => setDeleteConfirmation({ type: "all" })}
        />

        <ResultsGrid
          attempts={attempts}
          isLoading={isLoading}
          latestAttemptId={latestAttemptId}
          deletingAttemptId={deletingAttemptId}
          onOpenAttempt={(attemptId) => navigate(`/results/${attemptId}`)}
          onDeleteAttempt={(attempt) => setDeleteConfirmation({ type: "single", attempt })}
        />
      </Box>

      <DeleteResultsDialog
        confirmation={deleteConfirmation}
        isDeleting={isDeleting}
        onClose={() => setDeleteConfirmation(null)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
