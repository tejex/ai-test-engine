import { Box, Radio, RadioGroup, Slider, Stack, TextField, Typography } from "@mui/material";
import type { GenerationSettings } from "./types/generation";
import { useAppTheme } from "../styles/ThemeModeProvider";

type TestGenerationSettingsProps = {
  settings: GenerationSettings;
  onChange: (settings: GenerationSettings) => void;
};

const minQuestionCount = 5;
const maxQuestionCount = 15;

const difficultyOptions = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
] as const;

const questionMixOptions = [
  { value: "balanced", label: "Balanced" },
  { value: "recall", label: "Recall focused" },
  { value: "application", label: "Application focused" },
] as const;

const clampQuestionCount = (value: number) =>
  Math.min(Math.max(Math.round(value), minQuestionCount), maxQuestionCount);

export default function TestGenerationSettings({
  settings,
  onChange,
}: TestGenerationSettingsProps) {
  const { theme } = useAppTheme();

  const optionSx = (selected: boolean) => ({
    border: `1px solid ${selected ? theme.accent : theme.borderStrong}`,
    backgroundColor: selected ? theme.accentSoft : theme.surface,
    borderRadius: 1.5,
    px: 1,
    py: 0.75,
    cursor: "pointer",
    transition: "border-color 160ms ease, background-color 160ms ease",
    "&:hover": {
      borderColor: theme.accent,
      backgroundColor: selected ? theme.accentSoft : theme.elevated,
    },
  });

  return (
    <Box
      sx={{
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.panel,
        borderRadius: 2,
        p: 1.5,
        mb: 2,
        width: "100%",
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      <Stack direction={{ xs: "column", sm: "row" }} sx={{ justifyContent: "space-between", gap: 1, mb: 1.4 }}>
        <Box>
          <Typography sx={{ color: theme.text, fontSize: 14, fontWeight: 900 }}>
            Exam setup
          </Typography>
          <Typography sx={{ color: theme.mutedText, fontSize: 12, mt: 0.25 }}>
            Choose the difficulty, style, and length of the test.
          </Typography>
        </Box>

        <Typography sx={{ color: theme.accent, fontSize: 12, fontWeight: 900 }}>
          {settings.questionCount} questions
        </Typography>
      </Stack>

      <Stack spacing={1.5}>
        <Box>
          <Typography sx={{ color: theme.text, fontSize: 12, fontWeight: 800, mb: 0.75 }}>
            Difficulty
          </Typography>
          <RadioGroup
            row
            value={settings.difficulty}
            onChange={(event) =>
              onChange({
                ...settings,
                difficulty: event.target.value as GenerationSettings["difficulty"],
              })
            }
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 0.75,
            }}
          >
            {difficultyOptions.map((option) => {
              const selected = settings.difficulty === option.value;

              return (
                <Box key={option.value} component="label" sx={optionSx(selected)}>
                  <Stack direction="row" spacing={0.6} sx={{ alignItems: "center", minWidth: 0 }}>
                    <Radio
                      value={option.value}
                      size="small"
                      sx={{
                        p: 0,
                        color: theme.mutedText,
                        "&.Mui-checked": { color: theme.accent },
                        "& .MuiSvgIcon-root": { fontSize: 18 },
                      }}
                    />
                    <Typography sx={{ color: theme.text, fontSize: 12, fontWeight: 900, whiteSpace: "nowrap" }}>
                      {option.label}
                    </Typography>
                  </Stack>
                </Box>
              );
            })}
          </RadioGroup>
        </Box>

        <Box>
          <Typography sx={{ color: theme.text, fontSize: 12, fontWeight: 800, mb: 0.75 }}>
            Question mix
          </Typography>
          <RadioGroup
            value={settings.questionMix}
            onChange={(event) =>
              onChange({
                ...settings,
                questionMix: event.target.value as GenerationSettings["questionMix"],
              })
            }
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 0.75,
            }}
          >
            {questionMixOptions.map((option) => {
              const selected = settings.questionMix === option.value;

              return (
                <Box key={option.value} component="label" sx={optionSx(selected)}>
                  <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", minWidth: 0 }}>
                    <Radio
                      value={option.value}
                      size="small"
                      sx={{
                        p: 0,
                        color: theme.mutedText,
                        "&.Mui-checked": { color: theme.accent },
                        "& .MuiSvgIcon-root": { fontSize: 18 },
                      }}
                    />
                    <Typography sx={{ color: theme.text, fontSize: 12, fontWeight: 900 }}>
                      {option.label}
                    </Typography>
                  </Stack>
                </Box>
              );
            })}
          </RadioGroup>
        </Box>

        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5 }}>
              <Typography sx={{ color: theme.text, fontSize: 12, fontWeight: 800 }}>
                Question count
              </Typography>
              <Typography sx={{ color: theme.mutedText, fontSize: 12 }}>
                {minQuestionCount}-{maxQuestionCount}
              </Typography>
            </Stack>
            <Slider
              value={settings.questionCount}
              min={minQuestionCount}
              max={maxQuestionCount}
              step={1}
              onChange={(_, value) =>
                onChange({
                  ...settings,
                  questionCount: clampQuestionCount(Array.isArray(value) ? value[0] : value),
                })
              }
              sx={{
                color: theme.accent,
                px: 0.5,
                "& .MuiSlider-rail": {
                  backgroundColor: theme.borderStrong,
                  opacity: 1,
                },
                "& .MuiSlider-track": {
                  border: "none",
                },
                "& .MuiSlider-thumb": {
                  width: 16,
                  height: 16,
                  backgroundColor: theme.accent,
                  border: `3px solid ${theme.surface}`,
                },
              }}
            />
          </Box>

          <TextField
            size="small"
            type="number"
            value={settings.questionCount}
            slotProps={{
              htmlInput: {
                min: minQuestionCount,
                max: maxQuestionCount,
              },
            }}
            onChange={(event) =>
              onChange({
                ...settings,
                questionCount: clampQuestionCount(Number(event.target.value)),
              })
            }
            sx={{
              flex: "0 0 64px",
              "& .MuiOutlinedInput-root": {
                backgroundColor: theme.field,
                color: theme.text,
                borderRadius: 1.5,
                "& fieldset": { borderColor: theme.borderStrong },
                "&:hover fieldset": { borderColor: theme.accent },
                "&.Mui-focused fieldset": { borderColor: theme.accent },
              },
              "& input": { textAlign: "center", fontWeight: 900, py: 0.85, px: 0.75 },
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
