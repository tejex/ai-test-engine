import { useCallback, useEffect, useState } from "react";
import {
  clearAttempts as clearAttemptsRequest,
  deleteAttempt as deleteAttemptRequest,
  getRecentAttempts,
} from "../api/attempts";
import type { RecentAttempt } from "../components/types/results";

type UseRecentAttemptsOptions = {
  limit?: number;
};

export function useRecentAttempts(options: UseRecentAttemptsOptions = {}) {
  const { limit } = options;
  const [attempts, setAttempts] = useState<RecentAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [deletingAttemptId, setDeletingAttemptId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);

  const loadAttempts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const recentAttempts = await getRecentAttempts();
      setAttempts(typeof limit === "number" ? recentAttempts.slice(0, limit) : recentAttempts);
    } catch (err) {
      console.error("Failed to load recent attempts", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    loadAttempts();
  }, [loadAttempts]);

  const deleteAttempt = async (attemptId: string) => {
    setDeletingAttemptId(attemptId);

    try {
      await deleteAttemptRequest(attemptId);
      setAttempts((current) => current.filter((attempt) => attempt.id !== attemptId));
    } catch (err) {
      console.error("Failed to delete attempt", err);
      setError(err);
      throw err;
    } finally {
      setDeletingAttemptId(null);
    }
  };

  const clearAttempts = async () => {
    setIsClearing(true);

    try {
      await clearAttemptsRequest();
      setAttempts([]);
    } catch (err) {
      console.error("Failed to clear attempts", err);
      setError(err);
      throw err;
    } finally {
      setIsClearing(false);
    }
  };

  return {
    attempts,
    isLoading,
    error,
    deletingAttemptId,
    isClearing,
    reloadAttempts: loadAttempts,
    deleteAttempt,
    clearAttempts,
  };
}
