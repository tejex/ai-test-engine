import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import PageFrame from "../components/layout/PageFrame";
import MaterialInputCard from "../components/MaterialInputCard";
import TestGenerationSettings from "../components/TestGenerationSettings";
import { getStudyMaterialValidation } from "../components/notes/noteValidation";
import {
  defaultGenerationSettings,
  type GenerationSettings,
} from "../components/types/generation";
import { useGenerateTest } from "../hooks/useGenerateTest";

export default function UploadNotesPage() {
  const navigate = useNavigate();
  const { isGenerating, generateTestFromNotes } = useGenerateTest();
  const [draftNote, setDraftNote] = useState("");
  const [notes, setNotes] = useState<string[]>([]);
  const [generationSettings, setGenerationSettings] = useState<GenerationSettings>(
    defaultGenerationSettings,
  );

  const handleSubmit = async () => {
    try {
      const text = [...notes, draftNote.trim()].filter(Boolean).join("\n\n---\n\n");

      if (!text || !getStudyMaterialValidation(notes, draftNote).isValid) {
        return;
      }

      const test = await generateTestFromNotes({
        title: "Untitled Study Material",
        text,
        settings: generationSettings,
      });

      navigate(`/tests/${test.id}`);
    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  return (
    <PageFrame
      contentSx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1120,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 320px" },
          gap: 2,
          alignItems: "start",
        }}
      >
        <MaterialInputCard
          handleSubmit={handleSubmit}
          draftNote={draftNote}
          setDraftNote={setDraftNote}
          notes={notes}
          setNotes={setNotes}
          isGenerating={isGenerating}
        />
        <TestGenerationSettings
          settings={generationSettings}
          onChange={setGenerationSettings}
        />
      </Box>
    </PageFrame>
  );
}
