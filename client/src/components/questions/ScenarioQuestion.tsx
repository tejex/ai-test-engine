import { TextField } from '@mui/material'
import type { QuestionComponentProps } from "../../components/types/questions"
import { useAppTheme } from '../../styles/ThemeModeProvider'

export default function ScenarioQuestion({ value, onChange }: QuestionComponentProps) {
  const { theme } = useAppTheme()

  return (
    <TextField
      fullWidth
      multiline
      rows={5}
      variant="outlined"
      label="Your response"
      placeholder="Apply the material to the scenario..."
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
