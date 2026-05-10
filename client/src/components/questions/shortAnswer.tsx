// src/components/questions/ShortAnswer.tsx
import { TextField } from '@mui/material' 
import type { QuestionComponentProps } from "/Users/teju/Desktop/ai-test-engine/client/src/components/types/questions"

export default function ShortAnswer({ value, onChange }: QuestionComponentProps) {
  return (
    <TextField
      fullWidth
      multiline
      rows={4}
      variant="outlined"
      label="Your answer"
      placeholder="Type your answer here..."
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#5e6ad2' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#5e6ad2' },
      }}
    />
  ) 
}