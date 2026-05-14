// src/components/questions/ShortAnswer.tsx
import { TextField } from '@mui/material' 
import type { QuestionComponentProps } from "/Users/teju/Desktop/ai-test-engine/client/src/components/types/questions"
import { useAppTheme } from '../../styles/ThemeModeProvider'

export default function ShortAnswer({ value, onChange }: QuestionComponentProps) {
  const { theme } = useAppTheme()

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
        '& .MuiInputBase-input': { color: theme.text },
        '& .MuiInputLabel-root': { color: theme.mutedText },
        '& .MuiOutlinedInput-root fieldset': { borderColor: theme.borderStrong },
        '& .MuiOutlinedInput-root:hover fieldset': { borderColor: theme.accent },
        '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: theme.accent },
        '& .MuiInputLabel-root.Mui-focused': { color: theme.accent },
      }}
    />
  ) 
}
