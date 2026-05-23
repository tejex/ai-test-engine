import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

import {
  Box,
} from '@mui/material';
import MaterialInputCard from "../components/MaterialInputCard";
import { useAppTheme } from "../styles/ThemeModeProvider";

export default function App() {
  const navigate = useNavigate();
  const { theme } = useAppTheme();
  const [draftNote, setDraftNote] = useState("");
  const [notes, setNotes] = useState<string[]>([]);

  const handleSubmit = async () => {
    try {
      const text = [...notes, draftNote.trim()].filter(Boolean).join("\n\n---\n\n");

      if (!text) {
        return;
      }

      const doc = await api.post("/documents", {
        title: "Untitled Study Material",
        text,
      })

      const test = await api.post("/tests/generate", {
        documentId: doc.data.id,
      });

      navigate(`/tests/${test.data.id}`);
    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: theme.background,
        py: 6,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
        <MaterialInputCard
          handleSubmit={handleSubmit}
          draftNote={draftNote}
          setDraftNote={setDraftNote}
          notes={notes}
          setNotes={setNotes}
        />
      </Box>
    );
}
