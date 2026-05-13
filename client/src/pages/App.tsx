import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import AssessmentIcon from "@mui/icons-material/Assessment";
import MaterialInputCard from "../components/MaterialInputCard";
import RecentMaterialsSection from "../components/RecentMaterials";

export default function App() {
  const navigate = useNavigate();
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
        <Stack
          direction="row"
          sx={{
            width: "100%",
            maxWidth: 600,
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#e8e9ed",
              fontWeight: 700,
            }}
          >
            TestFlow AI
          </Typography>

          <Button
            variant="outlined"
            startIcon={<AssessmentIcon />}
            onClick={() => navigate("/results")}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              borderColor: "rgba(232, 233, 237, 0.25)",
              color: "#e8e9ed",
              fontWeight: 600,
              "&:hover": {
                borderColor: "#5e6ad2",
                backgroundColor: "rgba(94, 106, 210, 0.08)",
              },
            }}
          >
            Results
          </Button>
        </Stack>
        <MaterialInputCard handleSubmit={handleSubmit} text={text} setText={setText}/>
        <RecentMaterialsSection />
      </Box>
    );
}
