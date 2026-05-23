import { Box, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material'
import type { QuestionComponentProps } from "../../components/types/questions"
import { useAppTheme } from '../../styles/ThemeModeProvider'

const parseOrder = (value: string | undefined, options: string[]) => {
  if (!value) return options.map(() => '')

  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : options.map(() => '')
  } catch {
    return options.map(() => '')
  }
}

export default function Ordering({ value, onChange, question }: QuestionComponentProps) {
  const { theme } = useAppTheme()
  const options = Array.isArray(question?.options) ? question.options : []
  const orderedSteps = parseOrder(value, options)

  const updateStep = (index: number, step: string) => {
    const nextOrder = [...orderedSteps]
    nextOrder[index] = step
    onChange(JSON.stringify(nextOrder))
  }

  return (
    <Stack spacing={2}>
      <Typography sx={{ color: theme.mutedText, fontWeight: 500 }}>
        Put the steps in the correct order.
      </Typography>

      {options.map((_, index) => (
        <Box
          key={index}
          sx={{
            display: 'grid',
            gridTemplateColumns: '72px 1fr',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Typography sx={{ color: theme.text, fontWeight: 700 }}>
            Step {index + 1}
          </Typography>

          <FormControl fullWidth size="small">
            <Select
              value={orderedSteps[index] || ''}
              displayEmpty
              onChange={(event) => updateStep(index, event.target.value)}
              sx={{
                color: theme.text,
                '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.borderStrong },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.accent },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.accent },
              }}
            >
              <MenuItem value="">Choose step</MenuItem>
              {options.map((step) => (
                <MenuItem key={step} value={step}>
                  {step}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ))}
    </Stack>
  )
}
