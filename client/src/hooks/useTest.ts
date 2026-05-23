import { useEffect, useState } from "react";
import { getTest, submitTest } from "../api/tests";
import type { Question } from "../components/types/questions";

export function useTest(testId?: string) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(Boolean(testId));
  const [error, setError] = useState<unknown>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!testId) {
      setQuestions([]);
      setIsLoading(false);
      return;
    }

    let isActive = true;
    setIsLoading(true);
    setError(null);

    getTest(testId)
      .then((test) => {
        if (isActive) {
          setQuestions(test.questions);
        }
      })
      .catch((err) => {
        console.error("Failed to load test", err);
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
  }, [testId]);

  const submitAnswers = async (answers: Record<string, string>) => {
    if (!testId) {
      return null;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      return await submitTest(testId, { answers });
    } catch (err) {
      console.error("Failed to submit test", err);
      setError(err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    questions,
    isLoading,
    error,
    isSubmitting,
    submitAnswers,
  };
}
