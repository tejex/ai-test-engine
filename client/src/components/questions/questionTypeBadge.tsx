// src/components/questions/QuestionTypeBadge.tsx
import { Box, Typography } from '@mui/material' 
import type { Question } from "../../components/types/questions"

export default function QuestionTypeBadge({ question }: { question: Question }) {
  const config = {
    multiple_choice: {
      label: 'Multiple Choice',
      bgColor: '#e3f2fd',
      textColor: '#1976d2',
    },
    short_answer: {
      label: 'Short Answer',
      bgColor: '#e8f5e9',
      textColor: '#2e7d32',
    },
    true_false: {
      label: 'True/False',
      bgColor: '#fff3e0',
      textColor: '#ed6c02',
    },
  } 

  const difficultyConfig = {
    easy: { bgColor: '#e8f5e9', textColor: '#2e7d32' },
    medium: { bgColor: '#fff3e0', textColor: '#ed6c02' },
    hard: { bgColor: '#ffebee', textColor: '#d32f2f' },
  } 

  //@ts-ignore
  const typeStyles = config[question.type] 
  //@ts-ignore
  const diffStyles = difficultyConfig[question.difficulty] 

  return (
    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
      <Typography
        variant="caption"
        sx={{
          backgroundColor: typeStyles.bgColor,
          color: typeStyles.textColor,
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          display: 'inline-block',
          fontWeight: 500,
        }}
      >
        {typeStyles.label}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          backgroundColor: diffStyles.bgColor,
          color: diffStyles.textColor,
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          fontWeight: 500,
        }}
      >
        {question.difficulty}
      </Typography>
    </Box>
  ) 
}