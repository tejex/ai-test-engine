// src/components/questions/TrueFalse.tsx
import { RadioGroup, FormControlLabel, Radio } from '@mui/material' 
import type { QuestionComponentProps } from "../../components/types/questions"
import { useAppTheme } from '../../styles/ThemeModeProvider'

export default function TrueFalse({ value, onChange }: QuestionComponentProps) {
  const { theme } = useAppTheme()

  return (
    <RadioGroup value={value} onChange={(e) => onChange(e.target.value)}>
      <FormControlLabel
        value="true"
        control={<Radio />}
        label="True"
        sx={{
          color: theme.text,
          '& .MuiRadio-root': { color: theme.accent },
          '& .Mui-checked': { color: theme.accent },
        }}
      />
      <FormControlLabel
        value="false"
        control={<Radio />}
        label="False"
        sx={{
          color: theme.text,
          '& .MuiRadio-root': { color: theme.accent },
          '& .Mui-checked': { color: theme.accent },
        }}
      />
    </RadioGroup>
  ) 
}
