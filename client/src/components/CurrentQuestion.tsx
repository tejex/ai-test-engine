import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
} from '@mui/material';

const CurrentQuestion = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswerChange,
  selectedAnswer 
}:any) => {
  if (!question) {
    return (
      <Paper
        elevation={0}
        sx={{
          backgroundColor: '#e8e9ed',
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="body1" sx={{ color: '#0e1015' }}>
          Loading question...
        </Typography>
      </Paper>
    );
  }

  // Mock data for demo
  const difficulty = 'Medium';
  const type = 'Multiple Choice';
  const studyContext = 'Based on your recent study notes in "Advanced React Patterns", we are testing your understanding of state management alternatives to external libraries.';

  // Mock options for the demo question
  const options = [
    { value: 'redux', label: 'Redux' },
    { value: 'context', label: 'Context API' },
    { value: 'zustand', label: 'Zustand' },
    { value: 'recoil', label: 'Recoil' },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: '#e8e9ed',
        borderRadius: 2,
        p: 3,
      }}
    >
      {/* Question Metadata */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Chip
          label={`${difficulty} Difficulty`}
          size="small"
          sx={{
            backgroundColor: 'rgba(94, 106, 210, 0.1)',
            color: '#5e6ad2',
            fontWeight: 500,
          }}
        />
        <Chip
          label={type}
          size="small"
          sx={{
            backgroundColor: 'rgba(94, 106, 210, 0.1)',
            color: '#5e6ad2',
            fontWeight: 500,
          }}
        />
      </Stack>

      {/* Question Text */}
      <Typography
        variant="h6"
        sx={{
          color: '#0e1015',
          fontWeight: 600,
          mb: 3,
          lineHeight: 1.4,
        }}
      >
        {questionNumber}. {question.text || 'Which built-in React feature is best suited for sharing state globally across a deeply nested component tree without prop drilling?'}
      </Typography>

      {/* Answer Options */}
      <RadioGroup
        value={selectedAnswer || ''}
        onChange={(e) => onAnswerChange(e.target.value)}
        sx={{ mb: 4 }}
      >
        <Stack spacing={2}>
          {options.map((option) => (
            <Paper
              key={option.value}
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: selectedAnswer === option.value ? '#5e6ad2' : 'rgba(14, 16, 21, 0.1)',
                borderRadius: 2,
                backgroundColor: selectedAnswer === option.value ? 'rgba(94, 106, 210, 0.05)' : '#ffffff',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: '#5e6ad2',
                  backgroundColor: 'rgba(94, 106, 210, 0.02)',
                },
              }}
            >
              <FormControlLabel
                value={option.value}
                control={
                  <Radio
                    sx={{
                      color: 'rgba(14, 16, 21, 0.3)',
                      '&.Mui-checked': {
                        color: '#5e6ad2',
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body1" sx={{ color: '#0e1015' }}>
                    {option.label}
                  </Typography>
                }
                sx={{ width: '100%', m: 0, p: 2 }}
              />
            </Paper>
          ))}
        </Stack>
      </RadioGroup>

      {/* Study Context */}
      <Box
        sx={{
          p: 2,
          backgroundColor: 'rgba(94, 106, 210, 0.05)',
          borderRadius: 2,
          borderLeft: '3px solid #5e6ad2',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: '#5e6ad2',
            fontWeight: 600,
            display: 'block',
            mb: 0.5,
          }}
        >
          Study Context
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#0e1015',
            opacity: 0.8,
            lineHeight: 1.5,
          }}
        >
          {studyContext}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CurrentQuestion;