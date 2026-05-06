import { useState } from "react";
import { Input, Button } from "antd";
import { api } from "../api/client";

export default function App() {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    const doc = await api.post("/documents", {
      title: "Test Doc",
      text,
    });

    const test = await api.post("/tests/generate", {
      documentId: doc.data.id,
    });

    window.location.href = `/tests/${test.data.id}`;
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Paste Notes</h2>
      <Input.TextArea
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type="primary" onClick={handleSubmit} style={{ marginTop: 16 }}>
        Generate Test
      </Button>
    </div>
  );
}