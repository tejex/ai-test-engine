import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

import {
  Box,
} from '@mui/material';
import MaterialInputCard from "../components/MaterialInputCard";
import RecentMaterialsSection from "../components/RecentMaterials";
import { useAppTheme } from "../styles/ThemeModeProvider";

export default function App() {
  const navigate = useNavigate();
  const { theme } = useAppTheme();
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    try {
      console.log("starting submit");

      const doc = await api.post("/documents", {
        title: "Untitled Study Material",
        text,
      })

      console.log("document created", doc.data);

      const test = await api.post("/tests/generate", {
        documentId: doc.data.id,
      });

      console.log("test generated", test.data);

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
        <MaterialInputCard handleSubmit={handleSubmit} text={text} setText={setText}/>
        <RecentMaterialsSection />
      </Box>
    );
}
