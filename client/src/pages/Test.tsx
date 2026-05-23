import { useEffect, useState } from "react" 
import { useNavigate, useParams } from "react-router-dom" 
import { api } from "../api/client" 
import {
  Box,
  Typography,
  Paper,
  Stack,
} from '@mui/material' 

import AppButton from "../components/AppButton"
import TestHeader from "../components/TestHeader" 
import QuestionNavigation from "../components/QuestionNavigation" 
import CurrentQuestion from "../components/CurrentQuestion" 
import { useAppTheme } from "../styles/ThemeModeProvider"


export default function TestView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { theme } = useAppTheme()
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(765)

  useEffect(() => {
    api.get(`/tests/${id}`).then((res) => {
      setQuestions(res.data.questions) 
    }) 
  }, [id]) 

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)) 
    }, 1000) 
    return () => clearInterval(timer) 
  }, []) 

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60) 
    const secs = seconds % 60 
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}` 
  } 

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer }) 
  } 

  const handleSubmit = async () => {
    try {
      const res = await api.post(`/tests/${id}/submit`, {
        answers,
      });

      navigate(`/results?latest=${res.data.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const currentQuestion = questions[currentQuestionIndex] 
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: theme.background,
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
                backgroundColor: theme.surface,
                border: `1px solid ${theme.borderStrong}`,
                borderRadius: 2,
                p: 3,
                mt: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.text,
                    fontWeight: 500,
                  }}
                >
                  Time left
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.accent,
                    fontWeight: 600,
                    fontFamily: 'monospace',
                  }}
                >
                  {formatTime(timeLeft)}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                sx={{
                  alignItems: 'center',
                  ml: 'auto',
                }}
              >
                <Stack direction="row" spacing={1.25}>
                  <AppButton
                    variant="outlined"
                    onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIndex === 0}
                    sx={{
                      borderColor: theme.borderStrong,
                      color: theme.text,
                      '&:hover': {
                        borderColor: theme.accent,
                        backgroundColor: theme.accentSoft,
                      },
                      '&.Mui-disabled': {
                        borderColor: theme.border,
                        color: theme.mutedText,
                      },
                    }}
                  >
                    Previous
                  </AppButton>

                  <AppButton
                    variant="outlined"
                    onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                    disabled={isLastQuestion || questions.length === 0}
                    sx={{
                      borderColor: theme.accent,
                      color: theme.accent,
                      '&:hover': {
                        borderColor: theme.accentHover,
                        backgroundColor: theme.accentSoft,
                      },
                      '&.Mui-disabled': {
                        borderColor: theme.border,
                        color: theme.mutedText,
                      },
                    }}
                  >
                    Next
                  </AppButton>
                </Stack>

                <AppButton
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    px: 4,
                    backgroundColor: '#14b8a6',
                    color: '#ffffff',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: '#0f9488',
                    },
                  }}
                >
                  Submit Exam
                </AppButton>
              </Stack>
            </Paper>
          </Box>
        </Stack>
      </Box>
    </Box>
  ) 
}
