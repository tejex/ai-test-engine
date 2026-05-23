import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageFrame from "../components/layout/PageFrame";
import MaterialInputCard from "../components/MaterialInputCard";
import { useGenerateTest } from "../hooks/useGenerateTest";

export default function HomePage() {
  const navigate = useNavigate();
  const { isGenerating, generateTestFromNotes } = useGenerateTest();
  const [draftNote, setDraftNote] = useState("");
  const [notes, setNotes] = useState<string[]>([]);

  const handleSubmit = async () => {
    try {
      const text = [...notes, draftNote.trim()].filter(Boolean).join("\n\n---\n\n");

      if (!text) {
        return;
      }

      const test = await generateTestFromNotes({
        title: "Untitled Study Material",
        text,
      });

      navigate(`/tests/${test.id}`);
    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  return (
    <PageFrame
      contentSx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
    </PageFrame>
  );
}
