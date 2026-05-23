import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageFrame from "../components/layout/PageFrame";
import DeleteResultsDialog from "../components/results/DeleteResultsDialog";
import type { DeleteConfirmation } from "../components/results/DeleteResultsDialog";
import ResultsGrid from "../components/results/ResultsGrid";
import ResultsHeader from "../components/results/ResultsHeader";
import { useRecentAttempts } from "../hooks/useRecentAttempts";

export default function ResultsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    attempts,
    isLoading,
    deletingAttemptId,
    isClearing,
    deleteAttempt,
    clearAttempts,
  } = useRecentAttempts();
  const [deleteConfirmation, setDeleteConfirmation] = useState<DeleteConfirmation>(null);
  const latestAttemptId = searchParams.get("latest");

  const handleConfirmDelete = async () => {
    if (!deleteConfirmation) {
      return;
    }

    try {
      if (deleteConfirmation.type === "all") {
        await clearAttempts();
      } else {
        await deleteAttempt(deleteConfirmation.attempt.id);
      }

      setDeleteConfirmation(null);
    } catch {
      // The hook logs and stores the request error.
    }
  };

  const isDeleting = Boolean(deletingAttemptId) || isClearing;

  return (
    <PageFrame maxWidth={900}>
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

      <DeleteResultsDialog
        confirmation={deleteConfirmation}
        isDeleting={isDeleting}
        onClose={() => setDeleteConfirmation(null)}
        onConfirm={handleConfirmDelete}
      />
    </PageFrame>
  );
}
