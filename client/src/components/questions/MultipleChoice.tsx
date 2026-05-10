// src/components/questions/MultipleChoice.tsx
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material' 
import type { QuestionComponentProps } from "../../components/types/questions"

export default function MultipleChoice({ value, onChange, question }: QuestionComponentProps) {
  const options = question?.options || [] 
  
  return (
    <FormControl component="fieldset" sx={{ width: '100%' }}>
      <FormLabel component="legend" sx={{ mb: 2, fontWeight: 500 }}>
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
              '& .MuiRadio-root': { color: '#5e6ad2' },
              '& .Mui-checked': { color: '#5e6ad2' },
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  ) 
}