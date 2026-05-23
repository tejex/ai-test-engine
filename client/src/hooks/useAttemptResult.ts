import { useEffect, useState } from "react";
import { getAttemptResult } from "../api/results";
import type { AttemptResult } from "../components/types/results";

export function useAttemptResult(attemptId?: string) {
  const [result, setResult] = useState<AttemptResult | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(attemptId));
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!attemptId) {
      setResult(null);
      setIsLoading(false);
      return;
    }

    let isActive = true;
    setIsLoading(true);
    setError(null);

    getAttemptResult(attemptId)
      .then((attemptResult) => {
        if (isActive) {
          setResult(attemptResult);
        }
      })
      .catch((err) => {
        console.error("Failed to load attempt result", err);
        if (isActive) {
          setError(err);
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [attemptId]);

  return {
    result,
    isLoading,
    error,
  };
}
