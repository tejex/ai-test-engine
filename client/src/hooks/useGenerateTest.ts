import { useState } from "react";
import { createDocument } from "../api/documents";
import { generateTest } from "../api/tests";
import type { GenerationSettings } from "../components/types/generation";

type GenerateTestFromNotesPayload = {
  title: string;
  text: string;
  settings: GenerationSettings;
};

export function useGenerateTest() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const generateTestFromNotes = async ({ title, text, settings }: GenerateTestFromNotesPayload) => {
    setIsGenerating(true);
    setError(null);

    try {
      const document = await createDocument({ title, text });
      return await generateTest({ documentId: document.id, settings });
    } catch (err) {
      console.error("Failed to generate test", err);
      setError(err);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    error,
    generateTestFromNotes,
  };
}
