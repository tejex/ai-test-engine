import { api } from "./client";
import type { Question } from "../components/types/questions";

type GenerateTestPayload = {
  documentId: string;
};

type GenerateTestResponse = {
  id: string;
};

type TestResponse = {
  questions: Question[];
};

type SubmitTestPayload = {
  answers: Record<string, string>;
};

type SubmitTestResponse = {
  id: string;
};

export async function generateTest(payload: GenerateTestPayload) {
  const response = await api.post<GenerateTestResponse>("/tests/generate", payload);
  return response.data;
}

export async function getTest(testId: string) {
  const response = await api.get<TestResponse>(`/tests/${testId}`);
  return response.data;
}

export async function submitTest(testId: string, payload: SubmitTestPayload) {
  const response = await api.post<SubmitTestResponse>(`/tests/${testId}/submit`, payload);
  return response.data;
}
