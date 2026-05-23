// src/components/questions/QuestionTypeBadge.tsx
import { Box, Typography } from '@mui/material' 
import type { Difficulty, Question, QuestionType } from "../../components/types/questions"

export default function QuestionTypeBadge({ question }: { question: Question }) {
  const config: Record<QuestionType, { label: string; bgColor: string; textColor: string }> = {
    multiple_choice: {
      label: 'Multiple Choice',
      bgColor: '#e3f2fd',
      textColor: '#1976d2',
    },
    multi_select: {
      label: 'Multi Select',
      bgColor: '#e0f2fe',
      textColor: '#0369a1',
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
    fill_in_blank: {
      label: 'Fill In The Blank',
      bgColor: '#f3e8ff',
      textColor: '#7e22ce',
    },
    matching: {
      label: 'Matching',
      bgColor: '#ecfccb',
      textColor: '#4d7c0f',
    },
    ordering: {
      label: 'Ordering',
      bgColor: '#fef9c3',
      textColor: '#a16207',
    },
    scenario: {
      label: 'Scenario',
      bgColor: '#ffe4e6',
      textColor: '#be123c',
    },
  } 

  const difficultyConfig: Record<Difficulty, { bgColor: string; textColor: string }> = {
    easy: { bgColor: '#e8f5e9', textColor: '#2e7d32' },
    medium: { bgColor: '#fff3e0', textColor: '#ed6c02' },
    hard: { bgColor: '#ffebee', textColor: '#d32f2f' },
  } 

  const typeStyles = config[question.type] 
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
