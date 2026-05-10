// src/components/questions/TrueFalse.tsx
import { RadioGroup, FormControlLabel, Radio } from '@mui/material' 
import type { QuestionComponentProps } from "../../components/types/questions"

export default function TrueFalse({ value, onChange }: QuestionComponentProps) {
  return (
    <RadioGroup value={value} onChange={(e) => onChange(e.target.value)}>
      <FormControlLabel
        value="true"
        control={<Radio />}
        label="True"
        sx={{
          '& .MuiRadio-root': { color: '#5e6ad2' },
          '& .Mui-checked': { color: '#5e6ad2' },
        }}
      />
      <FormControlLabel
        value="false"
        control={<Radio />}
        label="False"
        sx={{
          '& .MuiRadio-root': { color: '#5e6ad2' },
          '& .Mui-checked': { color: '#5e6ad2' },
        }}
      />
    </RadioGroup>
  ) 
}