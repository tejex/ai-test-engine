import { api } from "./client";

type CreateDocumentPayload = {
  title: string;
  text: string;
};

type CreateDocumentResponse = {
  id: string;
};

export async function createDocument(payload: CreateDocumentPayload) {
  const response = await api.post<CreateDocumentResponse>("/documents", payload);
  return response.data;
}
