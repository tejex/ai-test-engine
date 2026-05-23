import { api } from "./client";
import type { AttemptResult } from "../components/types/results";

export async function getAttemptResult(attemptId: string) {
  const response = await api.get<AttemptResult>(`/results/${attemptId}`);
  return response.data;
}
