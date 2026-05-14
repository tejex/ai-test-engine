// src/components/CurrentQuestion.tsx
import { Box, Typography, Paper, Stack } from '@mui/material' 
import { MultipleChoice, ShortAnswer, TrueFalse, QuestionTypeBadge } from '../components/questions' 
import type { Question } from "../components/types/questions"
import { useAppTheme } from '../styles/ThemeModeProvider'

interface CurrentQuestionProps {
  question: Question 
  questionNumber: number 
  totalQuestions: number 
  onAnswerChange: (answer: string) => void 
  selectedAnswer?: string 
}

export default function CurrentQuestion({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswerChange, 
  selectedAnswer 
}: CurrentQuestionProps) {
  const { theme } = useAppTheme()

  if (!question) return <Typography>Loading...</Typography> 

  const renderQuestionInput = () => {
    const commonProps = {
      value: selectedAnswer,
      onChange: onAnswerChange,
      question,
    } 

    switch (question.type) {
      case 'multiple_choice':
        return <MultipleChoice {...commonProps} /> 
      case 'short_answer':
        return <ShortAnswer {...commonProps} /> 
      case 'true_false':
        return <TrueFalse {...commonProps} /> 
      default:
        return <ShortAnswer {...commonProps} /> 
    }
  } 

  return (
    <Paper elevation={0} sx={{ backgroundColor: theme.surface, border: `1px solid ${theme.borderStrong}`, borderRadius: 2, p: 3, mb: 3 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="overline" sx={{ color: theme.accent, fontWeight: 600, letterSpacing: 1 }}>
            Question {questionNumber} of {totalQuestions}
          </Typography>
          <Typography variant="h5" sx={{ color: theme.text, fontWeight: 600, mt: 1, mb: 2 }}>
            {question.question}
          </Typography>
          <QuestionTypeBadge question={question} />
        </Box>
        {renderQuestionInput()}
      </Stack>
    </Paper>
  ) 
}
