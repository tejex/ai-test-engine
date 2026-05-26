import type { RecentAttempt, ResultResponse } from "../types/results";

export type MissedQuestionCard = {
  response: ResultResponse;
  attempt: RecentAttempt;
};
