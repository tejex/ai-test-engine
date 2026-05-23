// src/components/questions/MultipleChoice.tsx
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material' 
import type { QuestionComponentProps } from "../../components/types/questions"
import { useAppTheme } from '../../styles/ThemeModeProvider'

export default function MultipleChoice({ value, onChange, question }: QuestionComponentProps) {
  const { theme } = useAppTheme()
  const options = Array.isArray(question?.options) ? question.options : []
  
  return (
    <FormControl component="fieldset" sx={{ width: '100%' }}>
      <FormLabel component="legend" sx={{ mb: 2, fontWeight: 500, color: theme.mutedText }}>
        Select your answer:
      </FormLabel>
      <RadioGroup value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option: string, idx: number) => (
          <FormControlLabel
            key={idx}
            value={option}
            control={<Radio />}
            label={option}
            sx={{
              mb: 1,
              color: theme.text,
              '& .MuiRadio-root': { color: theme.accent },
              '& .Mui-checked': { color: theme.accent },
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  ) 
}
