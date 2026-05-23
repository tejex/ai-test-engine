import { Box, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material'
import type { MatchingOptions, QuestionComponentProps } from "../../components/types/questions"
import { useAppTheme } from '../../styles/ThemeModeProvider'

const isMatchingOptions = (options: unknown): options is MatchingOptions =>
  Boolean(
    options &&
      !Array.isArray(options) &&
      typeof options === 'object' &&
      Array.isArray((options as MatchingOptions).prompts) &&
      Array.isArray((options as MatchingOptions).choices),
  )

const parseMatches = (value?: string): Record<string, string> => {
  if (!value) return {}

  try {
    const parsed = JSON.parse(value)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

export default function Matching({ value, onChange, question }: QuestionComponentProps) {
  const { theme } = useAppTheme()
  const options = isMatchingOptions(question?.options)
    ? question.options
    : { prompts: [], choices: [] }
  const matches = parseMatches(value)

  const updateMatch = (prompt: string, choice: string) => {
    onChange(JSON.stringify({ ...matches, [prompt]: choice }))
  }

  return (
    <Stack spacing={2}>
      <Typography sx={{ color: theme.mutedText, fontWeight: 500 }}>
        Match each item with the best answer.
      </Typography>

      {options.prompts.map((prompt) => (
        <Box
          key={prompt}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Typography sx={{ color: theme.text, fontWeight: 600 }}>{prompt}</Typography>

          <FormControl fullWidth size="small">
            <Select
              value={matches[prompt] || ''}
              displayEmpty
              onChange={(event) => updateMatch(prompt, event.target.value)}
              sx={{
                color: theme.text,
                '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.borderStrong },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.accent },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.accent },
              }}
            >
              <MenuItem value="">Choose match</MenuItem>
              {options.choices.map((choice) => (
                <MenuItem key={choice} value={choice}>
                  {choice}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ))}
    </Stack>
  )
}
