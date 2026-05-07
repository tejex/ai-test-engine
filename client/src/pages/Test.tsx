import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/client";
import {
  Box,
  Button,
  Typography,
  Paper,
  Stack,
} from '@mui/material';

import TestHeader from "../components/TestHeader";
import QuestionNavigation from "../components/QuestionNavigation";
import CurrentQuestion from "../components/CurrentQuestion";


export default function TestView() {
  const { id } = useParams()
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(2)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(765)

  useEffect(() => {
    api.get(`/tests/${id}`).then((res) => {
      setQuestions(res.data.questions);
    });
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    console.log("Submitting answers:", answers);
    // api.post(`/tests/${id}/submit`, { answers });
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#0e1015',
        py: 4,
        px: 3,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 1200 }}>
        <Stack direction="row" spacing={3} sx={{ width: '100%' }}>
          {/* Left Column - Question Navigation */}
          <Box sx={{ width: 280, flexShrink: 0 }}>
            <QuestionNavigation
              questions={questions}
              currentIndex={currentQuestionIndex}
              onSelectQuestion={setCurrentQuestionIndex}
              answers={answers}
            />
          </Box>

          {/* Right Column - Current Question */}
          <Box sx={{ flex: 1 }}>
            <TestHeader overallMastery={78} />
            
            <CurrentQuestion
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              onAnswerChange={(answer:any) => 
                currentQuestion && handleAnswerChange(currentQuestion.id, answer)
              }
              selectedAnswer={answers[currentQuestion?.id]}
            />

            {/* Bottom Navigation */}
            <Paper
              elevation={0}
              sx={{
                backgroundColor: '#e8e9ed',
                borderRadius: 2,
                p: 3,
                mt: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#0e1015',
                    fontWeight: 500,
                  }}
                >
                  Time left
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#5e6ad2',
                    fontWeight: 600,
                    fontFamily: 'monospace',
                  }}
                >
                  {formatTime(timeLeft)}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestionIndex === 0}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    borderColor: '#5e6ad2',
                    color: '#5e6ad2',
                    '&:hover': {
                      borderColor: '#4a56b8',
                      backgroundColor: 'rgba(94, 106, 210, 0.04)',
                    },
                    '&.Mui-disabled': {
                      borderColor: 'rgba(94, 106, 210, 0.3)',
                      color: 'rgba(94, 106, 210, 0.3)',
                    },
                  }}
                >
                  Previous
                </Button>
                
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 4,
                    backgroundColor: '#5e6ad2',
                    color: '#ffffff',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: '#4a56b8',
                    },
                  }}
                >
                  Submit Answer
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}