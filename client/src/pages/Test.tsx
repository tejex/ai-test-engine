import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/client";
import { Button, Input } from "antd";

export default function Test() {
  const { id } = useParams();
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    api.get(`/tests/${id}`).then((res) => {
      setQuestions(res.data.questions);
    });
  }, [id]);

  return (
    <div style={{ padding: 40 }}>
      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: 20 }}>
          <p>{q.text}</p>
          <Input
            onChange={(e) =>
              setAnswers({ ...answers, [q.id]: e.target.value })
            }
          />
        </div>
      ))}
      <Button type="primary">Submit</Button>
    </div>
  );
}