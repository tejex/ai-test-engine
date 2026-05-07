import { useState } from "react";
import { api } from "../api/client";

import {
  Box
} from '@mui/material';
import MaterialInputCard from "../components/MaterialInputCard";
import RecentMaterialsSection from "../components/RecentMaterials";

export default function App() {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    try {
      console.log("starting submit");

      const doc = await api.post("/documents", {
        title: "Test Doc",
        text,
      })

      console.log("document created", doc.data);

      const test = await api.post("/tests/generate", {
        documentId: doc.data.id,
      });

      console.log("test generated", test.data);

      window.location.href = `/tests/${test.data.id}`;
    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#0e1015', // dark background
        py: 6,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
        <MaterialInputCard handleSubmit={handleSubmit} setText={setText}/>
        <RecentMaterialsSection />
      </Box>
    );
}