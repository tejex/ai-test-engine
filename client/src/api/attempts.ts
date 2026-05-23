import { api } from "./client";
import type { RecentAttempt } from "../components/types/results";

export async function getRecentAttempts() {
  const response = await api.get<RecentAttempt[]>("/attempts/recent");
  return response.data || [];
}

export async function deleteAttempt(attemptId: string) {
  await api.delete(`/attempts/${attemptId}`);
}

export async function clearAttempts() {
  await api.delete("/attempts");
}
