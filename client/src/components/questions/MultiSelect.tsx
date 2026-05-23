import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material'
import type { QuestionComponentProps } from "../../components/types/questions"
import { useAppTheme } from '../../styles/ThemeModeProvider'

const parseSelected = (value?: string) => {
  if (!value) return []

  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default function MultiSelect({ value, onChange, question }: QuestionComponentProps) {
  const { theme } = useAppTheme()
  const options = Array.isArray(question?.options) ? question.options : []
  const selected = parseSelected(value)

  const toggleOption = (option: string) => {
    const nextSelected = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option]

    onChange(JSON.stringify(nextSelected))
  }

  return (
    <FormControl component="fieldset" sx={{ width: '100%' }}>
      <FormLabel component="legend" sx={{ mb: 2, fontWeight: 500, color: theme.mutedText }}>
        Select all correct answers:
      </FormLabel>
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                sx={{
                  color: theme.accent,
                  '&.Mui-checked': { color: theme.accent },
                }}
              />
            }
            label={option}
            sx={{
              mb: 1,
              color: theme.text,
            }}
          />
        ))}
      </FormGroup>
    </FormControl>
  )
}
